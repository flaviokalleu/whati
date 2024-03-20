import type {
  AuthenticationCreds,
  AuthenticationState,
  SignalDataTypeMap
} from "@whiskeysockets/baileys";
import { BufferJSON, initAuthCreds, proto } from "@whiskeysockets/baileys";
import { useRedisAuthStateWithHSet } from 'baileys-redis-auth';
import Whatsapp from "../models/Whatsapp";

type RedisOptions = {
  host: string;
  port: string | number;
  password: string;
};

const KEY_MAP: { [T in keyof SignalDataTypeMap]: string } = {
  "pre-key": "preKeys",
  session: "sessions",
  "sender-key": "senderKeys",
  "app-state-sync-key": "appStateSyncKeys",
  "app-state-sync-version": "appStateVersions",
  "sender-key-memory": "senderKeyMemory"
};
const authState = async (
  whatsapp: Whatsapp
): Promise<{ state: AuthenticationState; saveState: () => void }> => {
  let creds: AuthenticationCreds;
  let keys: any = {};
  const saveState = async () => {
    try {
      await whatsapp.update({
        session: JSON.stringify({ creds, keys }, BufferJSON.replacer, 0)
      });
    } catch (error) {
      console.log(error);
    }
  };

  const redisOptions = {
    host: process.env.REDIS_AUTHSTATE_SERVER,
    port: parseInt(process.env.REDIS_AUTHSTATE_PORT || '0', 10),
    password: process.env.REDIS_AUTHSTATE_PWD
  };

  const { state: redisAuthState, saveCreds, redis } = await useRedisAuthStateWithHSet(redisOptions, process.env.REDIS_AUTHSTATE_DATABASE);

  if (Object.keys(await redis.hgetall(process.env.REDIS_AUTHSTATE_DATABASE)).length === 0) {
    // Redis está vazio, carregue do arquivo
    if (whatsapp.session && whatsapp.session !== null) {
      const result = JSON.parse(whatsapp.session, BufferJSON.reviver);
      creds = result.creds;
      keys = result.keys;
    } else {
      creds = initAuthCreds();
      keys = {};
    }
    // Salve no Redis
    await saveCreds();
  } else {
    // Redis já contém dados, carregue do Redis
    creds = redisAuthState.creds;
    keys = redisAuthState.keys;
  }

  return {
    state: {
      creds,
      keys: {
        get: (type, ids) => {
          const key = KEY_MAP[type];
          return ids.reduce((dict: any, id) => {
            let value = keys[key]?.[id];
            if (value) {
              if (type === "app-state-sync-key") {
                value = proto.Message.AppStateSyncKeyData.fromObject(value);
              }
              dict[id] = value;
            }
            return dict;
          }, {});
        },
        set: (data: any) => {
          // eslint-disable-next-line no-restricted-syntax, guard-for-in
          for (const i in data) {
            const key = KEY_MAP[i as keyof SignalDataTypeMap];
            keys[key] = keys[key] || {};
            Object.assign(keys[key], data[i]);
          }
          saveState();
          // Salve também no Redis
          saveCreds();
        }
      }
    },
    saveState: async () => {
      await saveCreds(); // Salva as credenciais no Redis
      saveState(); // Salva no banco de dados local
    }
  };
};

export default authState;
