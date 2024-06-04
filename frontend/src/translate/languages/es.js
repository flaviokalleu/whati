const messages = {
	es: {
		translations: {
			signup: {
				title: "Registro",
				toasts: {
					success:
						"¡El usuario ha sido creado satisfactoriamente! ¡Ahora inicia sesión!",
					fail: "Error creando el usuario. Verifica la data reportada.",
				},
				form: {
					name: "Nombre",
					email: "Correo Electrónico",
					password: "Contraseña",
				},
				buttons: {
					submit: "Regístrate",
					login: "¿Ya tienes una cuenta? ¡Inicia sesión!",
				},
			},
			login: {
				title: "Inicio de Sesión",
				form: {
					email: "Correo Electrónico",
					password: "Contraseña",
				},
				buttons: {
					submit: "Ingresa",
					register: "¿No tienes cuenta? ¡Regístrate!",
				},
			},
			plans: {
				form: {
				  name: "Nombre",
				  users: "Usuarios",
				  connections: "Conexiones",
				  campaigns: "Campañas",
				  schedules: "Programaciones",
				  enabled: "Habilitadas",
				  disabled: "Deshabilitadas",
				  clear: "Cancelar",
				  delete: "Eliminar",
				  save: "Guardar",
				  yes: "Sí",
				  no: "No",
				  money: "R$",
				},
			  },
			  companies: {
				title: "Registrar Empresa",
				form: {
				  name: "Nombre de la Empresa",
				  plan: "Plan",
				  token: "Token",
				  submit: "Registrar",
				  success: "Empresa creada con éxito",
				},
			  },
			auth: {
				toasts: {
					success: "¡Inicio de sesión exitoso!",
				},
				token: "Token",
			},		
			dashboard: {
				charts: {
				  perDay: {
					title: "Atenciones hoy: ",
				  },
				  filters: {
					startDate: "Fecha de Inicio",
					endDate: "Fecha Final",
					periodText: "Período",
					periodOptions: {
					  input: "Seleccione el período deseado",
					  zero: "Ningún período seleccionado",
					  three: "Últimos tres días",
					  seven: "Últimos siete días",
					  fifteen: "Últimos quince días",
					  thirty: "Últimos treinta días",
					  sixty: "Últimos sesenta días",
					  ninety: "Últimos noventa días"
					},
					duedate: "Fecha de Vencimiento",
					filtertype: {
					  title: "Tipo de Filtro",
					  valueA: "Filtro por Fecha",
					  valueB: "Filtro por Período",
					  helperText: "Seleccione el período deseado",
					},
				  },
				},
				cards: {
				  attdPendants: "Atd. Pendientes",
				  attdHappening: "Atd. En Curso",
				  attdPerformed: "Atd. Realizados",
				  leads: "Leads",
				  mtofService: "T.M. de Atención",
				  mtofwaiting: "T.M. de Espera",
				}
			  },
			  kanban: {
				inopen: "En abierto",
			},
			todo: {
				newtask: "Nueva tarea",
				buttons: {
					add: "Agregar",
					edit: "Guardar",
				},
			},
			
			  
			connections: {
				title: "Conexiones",
				toasts: {
					deleted:
						"¡La conexión de WhatsApp ha sido borrada satisfactoriamente!",
				},
				confirmationModal: {
					deleteTitle: "Borrar",
					deleteMessage: "¿Estás seguro? Este proceso no puede ser revertido.",
					disconnectTitle: "Desconectar",
					disconnectMessage: "Estás seguro? Deberá volver a leer el código QR",
				},
				buttons: {
					add: "Agrega WhatsApp",
					disconnect: "Desconectar",
					tryAgain: "Inténtalo de nuevo",
					qrcode: "QR CODE",
					newQr: "Nuevo QR CODE",
					connecting: "Conectando",
				},
				toolTips: {
					disconnected: {
						title: "No se pudo iniciar la sesión de WhatsApp",
						content:
							"Asegúrese de que su teléfono celular esté conectado a Internet y vuelva a intentarlo o solicite un nuevo código QR",
					},
					qrcode: {
						title: "Esperando la lectura del código QR",
						content:
							"Haga clic en el botón 'CÓDIGO QR' y lea el Código QR con su teléfono celular para iniciar la sesión",
					},
					connected: {
						title: "Conexión establecida",
					},
					timeout: {
						title: "Se perdió la conexión con el teléfono celular",
						content:
							"Asegúrese de que su teléfono celular esté conectado a Internet y que WhatsApp esté abierto, o haga clic en el botón 'Desconectar' para obtener un nuevo código QR",
					},
				},
				table: {
					name: "Nombre",
					status: "Estado",
					lastUpdate: "Última Actualización",
					default: "Por Defecto",
					actions: "Acciones",
					session: "Sesión",
				},
			},
			whatsappModal: {
				title: {
					add: "Agrega WhatsApp",
					edit: "Edita WhatsApp",
				},
				form: {
					name: "Nombre",
					default: "Por Defecto",
					sendIdQueue: "Cola",
					timeSendQueue: "Redirigir a cola en X minutos",
					queueRedirection: "Redirección de Cola",
					queueRedirectionDesc: "Seleccione una cola para redirigir a los contactos que no tienen cola asignada",
					prompt: "Indicación",
					maxUseBotQueues: "Enviar bot X veces",
					timeUseBotQueues: "Intervalo en minutos entre envíos de bot",
					expiresTicket: "Cerrar chats abiertos después de X minutos",
					expiresInactiveMessage: "Mensaje de cierre por inactividad",
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
				success: "WhatsApp guardado satisfactoriamente.",
			},
			qrCode: {
				message: "Lée el código QR para empezar la sesión.",
			},
			contacts: {
				title: "Contactos",
				toasts: {
					deleted: "¡Contacto borrado satisfactoriamente!",
				},
				searchPlaceholder: "Buscar...",
				confirmationModal: {
					deleteTitle: "Borrar",
					importTitlte: "Importar contactos",
					deleteMessage:
						"¿Estás seguro que deseas borrar este contacto? Todos los tickets relacionados se perderán.",
					importMessage:
						"¿Quieres importar todos los contactos desde tu teléfono?",
				},
				buttons: {
					import: "Importar Contactos",
					add: "Agregar Contacto",
				},
				table: {
					name: "Nombre",
					whatsapp: "WhatsApp",
					email: "Correo Electrónico",
					actions: "Acciones",
				},
			},
			queueIntegrationModal: {
				title: {
				  add: "Agregar proyecto",
				  edit: "Editar proyecto",
				},
				form: {
				  id: "ID",
				  type: "Tipo",
				  name: "Nombre",
				  projectName: "Nombre del Proyecto",
				  language: "Idioma",
				  jsonContent: "Contenido JSON",
				  urlN8N: "URL",
				  typebotSlug: "Typebot - Slug",
				  typebotExpires: "Tiempo en minutos para expirar una conversación",
				  typebotKeywordFinish: "Palabra para finalizar el ticket",
				  typebotKeywordRestart: "Palabra para reiniciar el flujo",
				  typebotRestartMessage: "Mensaje al reiniciar la conversación",
				  typebotUnknownMessage: "Mensaje de opción inválida",
				  typebotDelayMessage: "Intervalo (ms) entre mensajes",
				},
				buttons: {
				  okAdd: "Agregar",
				  okEdit: "Guardar",
				  cancel: "Cancelar",
				  test: "Probar Bot",
				},
				messages: {
				  testSuccess: "Integración probada con éxito",
				  addSuccess: "Integración agregada con éxito",
				  editSuccess: "Integración editada con éxito",
				},
			  },
			  promptModal: {
				form: {
				  name: "Nombre",
				  prompt: "Prompt",
				  voice: "Voz",
				  max_tokens: "Máximo de Tokens en la respuesta",
				  temperature: "Temperatura",
				  apikey: "Clave API",
				  max_messages: "Máximo de mensajes en el Historial",
				  voiceKey: "Clave de la API de Voz",
				  voiceRegion: "Región de Voz",
				},
				success: "Prompt guardado con éxito",
				title: {
				  add: "Agregar Prompt",
				  edit: "Editar Prompt",
				},
				buttons: {
				  okAdd: "Agregar",
				  okEdit: "Guardar",
				  cancel: "Cancelar",
				},
			  },
			  prompts: {
				title: "Prompts",
				table: {
				  name: "Nombre",
				  queue: "Sector/Cola",
				  max_tokens: "Máximo Tokens Respuesta",
				  actions: "Acciones",
				},
				confirmationModal: {
				  deleteTitle: "Eliminar",
				  deleteMessage: "¿Estás seguro? ¡Esta acción no se puede deshacer!",
				},
				buttons: {
				  add: "Agregar Prompt",
				},
			  },
			contactModal: {
				title: {
					add: "Agregar contacto",
					edit: "Editar contacto",
				},
				form: {
					mainInfo: "Detalles del contacto",
					extraInfo: "Información adicional",
					name: "Nombre",
					number: "Número de Whatsapp",
					email: "Correo Electrónico",
					extraName: "Nombre del Campo",
					whatsapp: "Conexión de Origen:",
					extraValue: "Valor",
				},
				buttons: {
					addExtraInfo: "Agregar información",
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
					greetingMessage: "Mensaje de bienvenida",
					complationMessage: "Mensaje de finalización",
					outOfHoursMessage: "Mensaje fuera del horario laboral",
					ratingMessage: "Mensaje de calificación",
					token: "Token",
					orderQueue: "Orden de la cola (Bot)",
					integrationId: "ID de integración",
				},
				success: "Contacto guardado satisfactoriamente.",
			},
			queueModal: {
				title: {
					add: "Agregar cola",
					edit: "Editar cola",
				},
				form: {
					name: "Nombre",
					color: "Color",
					greetingMessage: "Mensaje de saludo",
				},
				buttons: {
					okAdd: "Añadir",
					okEdit: "Ahorrar",
					cancel: "Cancelar",
					attach: "Anexar Arquivo",
				},
			},
			userModal: {
				title: {
					add: "Agregar usuario",
					edit: "Editar usuario",
				},
				form: {
					name: "Nombre",
					email: "Correo Electrónico",
					password: "Contraseña",
					profile: "Perfil",
					startWork: "Empezar a trabajar",
					endWork: "Fin del trabajo",
				},
				buttons: {
					okAdd: "Agregar",
					okEdit: "Guardar",
					cancel: "Cancelar",
				},
				success: "Usuario guardado satisfactoriamente.",
			},
			chat: {
				noTicketMessage: "Selecciona un ticket para empezar a chatear.",
			},
			uploads: {
				titles: {
				  titleUploadMsgDragDrop: "ARRASTRA Y SUELTA LOS ARCHIVOS EN EL CAMPO DE ABAJO",
				  titleFileList: "Lista de archivos"
				},
			  },
			scheduleModal: {
				title: {
				  add: "Nueva Programación",
				  edit: "Editar Programación",
				},
				form: {
				  body: "Mensaje",
				  contact: "Contacto",
				  sendAt: "Fecha de Programación",
				  sentAt: "Fecha de Envío",
				},
				buttons: {
				  okAdd: "Agregar",
				  okEdit: "Guardar",
				  cancel: "Cancelar",
				},
				success: "Programación guardada con éxito.",
			  },
			  tagModal: {
				title: {
				  add: "Nueva Etiqueta",
				  edit: "Editar Etiqueta",
				},
				form: {
				  name: "Nombre",
				  color: "Color",
				},
				buttons: {
				  okAdd: "Agregar",
				  okEdit: "Guardar",
				  cancel: "Cancelar",
				},
				success: "Etiqueta guardada con éxito.",
			  },
			  uploads: {
				titles: {
				  titleUploadMsgDragDrop: "ARRASTRA Y SUELTA ARCHIVOS EN EL CAMPO ABAJO",
				  titleFileList: "Lista de archivo(s)"
				},
			  },	
			ticketsManager: {
				buttons: {
					newTicket: "Nuevo",
				},
			},
			ticketsQueueSelect: {
				placeholder: "Linhas",
			},
			tickets: {
				toasts: {
					deleted: "El ticket en el que estabas ha sido borrado.",
				},
				notification: {
					message: "Mensaje de",
				},
				tabs: {
					open: { title: "Bandeja" },
					closed: { title: "Resueltos" },
					search: { title: "Buscar" },
				},
				search: {
					placeholder: "Buscar tickets y mensajes.",
				},
				buttons: {
					showAll: "Todos",
				},
			},
			transferTicketModal: {
				title: "Transferir Ticket",
				fieldLabel: "Escriba para buscar usuarios",
				fieldQueueLabel: "Transferir a cola",
				fieldQueuePlaceholder: "Seleccione una cola",
				noOptions: "No se encontraron usuarios con ese nombre",
				buttons: {
					ok: "Transferir",
					cancel: "Cancelar",
				},
			},
			ticketsList: {
				pendingHeader: "Pendientes",
				assignedHeader: "En atención",
				noTicketsTitle: "¡Nada aquí!",
				noTicketsMessage: "No se encontraron tickets con este estado o término de búsqueda",
				
				buttons: {
					accept: "Aceptar",
					closed: "Cerrar",
					reopen: "Reabrir"
				},
			},
			newTicketModal: {
				title: "Crear Ticket",
				fieldLabel: "Escribe para buscar un contacto",
				add: "Añadir",
				buttons: {
					ok: "Guardar",
					cancel: "Cancelar",
				},
			},
			mainDrawer: {
				listItems: {
					dashboard: "Tablero",
					connections: "Conexiones",
					tickets: "Tickets",
					quickMessages: "Respuestas Rápidas",
					contacts: "Contactos",
					queues: "Colas y Chatbot",
					tags: "Etiquetas",
					administration: "Administración",
					users: "Usuarios",
					settings: "Configuraciones",
					helps: "Ayuda",
					messagesAPI: "API",
					schedules: "Programaciones",
					campaigns: "Campañas",
					annoucements: "Anuncios",
					chats: "Chat Interno",
					financeiro: "Financiero",
					files: "Lista de archivos",
					prompts: "Open.Ai",
					queueIntegration: "Integraciones de Cola",	
				},
				appBar: {
					user: {
						profile: "Perfil",
						logout: "Cerrar Sesión",
					},
				},
			},
			queueIntegration: {
				title: "Integraciones",
				table: {
				  id: "ID",
				  type: "Tipo",
				  name: "Nombre",
				  projectName: "Nombre del Proyecto",
				  language: "Idioma",
				  lastUpdate: "Última actualización",
				  actions: "Acciones",
				},
				buttons: {
				  add: "Agregar Proyecto",
				},
				searchPlaceholder: "Buscar...",
				confirmationModal: {
				  deleteTitle: "Eliminar",
				  deleteMessage:
					"¿Estás seguro? ¡Esta acción no se puede revertir! y se eliminará de las colas y conexiones vinculadas",
				},
			  },
			  files: {
				title: "Lista de archivos",
				table: {
				  name: "Nombre",
				  contacts: "Contactos",
				  actions: "Acción",
				},
				toasts: {
				  deleted: "Lista eliminada con éxito",
				  deletedAll: "Todas las listas se eliminaron con éxito",
				},
				buttons: {
				  add: "Agregar",
				  deleteAll: "Eliminar Todos",
				},
				confirmationModal: {
				  deleteTitle: "Eliminar",
				  deleteAllTitle: "Eliminar Todos",
				  deleteMessage: "¿Estás seguro de que deseas eliminar esta lista?",
				  deleteAllMessage: "¿Estás seguro de que deseas eliminar todas las listas?",
				},
			  },
			  messagesAPI: {
				title: "API",
				doc: "Documentación para el envío de mensajes:",
				formMethod: "Método de envío:",
				textMessage: {
					number: "Número",
					body: "Mensaje",
					token: "Token registrado",
				},
				mediaMessage: {
					number: "Número",
					body: "Nombre del archivo",
					media: "Archivo",
					token: "Token registrado",
				},
				buttons: {
					submit: "Enviar",
				},
				helpTexts: {
					textMsg: {
						title: "Mensaje de Texto",
						info: "A continuación, se presenta la lista de información necesaria para el envío de mensajes de texto:",
						endpoint: "Endpoint: ",
						method: "Método: ",
						headers: "Encabezados: ",
						body: "Cuerpo: ",
					},
					test: "Prueba de envío: ",
					mediaMsg: {
						title: "Mensaje Multimedia",
						info: "A continuación, se presenta la lista de información necesaria para el envío de mensajes multimedia:",
						endpoint: "Endpoint: ",
						method: "Método: ",
						headers: "Encabezados: ",
						body: "Cuerpo: ",
						formData: "FormData: ",
					},
					instructions: "Instrucciones",
					notes: {
						title: "Observaciones importantes",
						textA: "Antes de enviar mensajes, es necesario registrar el token vinculado a la conexión que enviará los mensajes. <br/>Para realizar el registro, acceda al menú 'Conexiones', haga clic en el botón editar de la conexión e inserte el token en el campo correspondiente.",
						textB: {
							title: "El número para el envío no debe tener máscara ni caracteres especiales y debe estar compuesto por:",
							partA: "Código de País",
							partB: "Código de Área",
							partC: "Número",
						},
					},
				},
			},
			
			  notifications: {
				noTickets: "Ninguna notificación.",
			  },
			  quickMessages: {
				title: "Respuestas Rápidas",
				searchPlaceholder: "Buscar...",
				noAttachment: "Sin adjunto",
				confirmationModal: {
				  deleteTitle: "Eliminación",
				  deleteMessage: "¡Esta acción es irreversible! ¿Desea continuar?",
				},
				buttons: {
				  add: "Agregar",
				  attach: "Adjuntar Archivo",
				  cancel: "Cancelar",
				  edit: "Editar",
				},
				toasts: {
				  success: "Acceso directo agregado con éxito",
				  deleted: "Acceso directo eliminado con éxito",
				},
				dialog: {
				  title: "Respuesta Rápida",
				  shortcode: "Acceso directo",
				  message: "Respuesta",
				  save: "Guardar",
				  cancel: "Cancelar",
				  geral: "Permitir edición",
				  add: "Agregar",
				  edit: "Editar",
				  visao: "Permitir visión",
				},
				table: {
				  shortcode: "Acceso directo",
				  message: "Mensaje",
				  actions: "Acciones",
				  mediaName: "Nombre del Archivo",
				  status: "Estado",
				},
			  },
			  messageVariablesPicker: {
				label: "Variables disponibles",
				vars: {
				  contactFirstName: "Primer Nombre",
				  contactName: "Nombre",
				  greeting: "Saludo",
				  protocolNumber: "Protocolo",
				  date: "Fecha",
				  hour: "Hora",
				},
			  },
			  contactLists: {
				title: "Listas de Contactos",
				table: {
				  name: "Nombre",
				  contacts: "Contactos",
				  actions: "Acciones",
				},
				buttons: {
				  add: "Nueva Lista",
				},
				dialog: {
				  name: "Nombre",
				  company: "Empresa",
				  okEdit: "Editar",
				  okAdd: "Agregar",
				  add: "Agregar",
				  edit: "Editar",
				  cancel: "Cancelar",
				},
				confirmationModal: {
				  deleteTitle: "Eliminar",
				  deleteMessage: "Esta acción no se puede revertir.",
				},
				toasts: {
				  deleted: "Registro eliminado",
				},
			  },
			  contactListItems: {
				title: "Contactos",
				searchPlaceholder: "Búsqueda",
				buttons: {
				  add: "Nuevo",
				  lists: "Listas",
				  import: "Importar",
				},
				dialog: {
				  name: "Nombre",
				  number: "Número",
				  whatsapp: "Whatsapp",
				  email: "Correo Electrónico",
				  okEdit: "Editar",
				  okAdd: "Agregar",
				  add: "Agregar",
				  edit: "Editar",
				  cancel: "Cancelar",
				},
				table: {
				  name: "Nombre",
				  number: "Número",
				  whatsapp: "Whatsapp",
				  email: "Correo Electrónico",
				  actions: "Acciones",
				},
				confirmationModal: {
				  deleteTitle: "Eliminar",
				  deleteMessage: "Esta acción no se puede revertir.",
				  importMessage: "¿Desea importar los contactos de esta hoja de cálculo?",
				  importTitlte: "Importar",
				},
				toasts: {
				  deleted: "Registro eliminado",
				},
			  },
			  campaigns: {
				title: "Campañas",
				searchPlaceholder: "Búsqueda",
				buttons: {
				  add: "Nueva Campaña",
				  contactLists: "Listas de Contactos",
				},
				table: {
				  name: "Nombre",
				  whatsapp: "Conexión",
				  contactList: "Lista de Contactos",
				  status: "Estado",
				  scheduledAt: "Programada",
				  completedAt: "Completada",
				  confirmation: "Confirmación",
				  actions: "Acciones",
				},
				dialog: {
				  new: "Nueva Campaña",
				  update: "Editar Campaña",
				  readonly: "Solo Lectura",
				  form: {
					name: "Nombre",
					message1: "Mensaje 1",
					message2: "Mensaje 2",
					message3: "Mensaje 3",
					message4: "Mensaje 4",
					message5: "Mensaje 5",
					confirmationMessage1: "Mensaje de Confirmación 1",
					confirmationMessage2: "Mensaje de Confirmación 2",
					confirmationMessage3: "Mensaje de Confirmación 3",
					confirmationMessage4: "Mensaje de Confirmación 4",
					confirmationMessage5: "Mensaje de Confirmación 5",
					messagePlaceholder: "Contenido del mensaje",
					whatsapp: "Conexión",
					status: "Estado",
					scheduledAt: "Programada",
					confirmation: "Confirmación",
					contactList: "Lista de Contactos",
					tagList: "Lista de Etiquetas",
					fileList: "Lista de Archivos"
				  },
				  buttons: {
					add: "Agregar",
					edit: "Actualizar",
					okadd: "Ok",
					cancel: "Cancelar Disparos",
					restart: "Reiniciar Disparos",
					close: "Cerrar",
					attach: "Adjuntar Archivo",
				  },
				},
				confirmationModal: {
				  deleteTitle: "Eliminar",
				  deleteMessage: "Esta acción no se puede revertir.",
				},
				toasts: {
				  success: "Operación realizada con éxito",
				  cancel: "Campaña cancelada",
				  restart: "Campaña reiniciada",
				  deleted: "Registro eliminado",
				},
			  },
			  announcements: {
				active: 'Activo',
				inactive: 'Inactivo',
				title: "Anuncios",
				searchPlaceholder: "Búsqueda",
				buttons: {
				  add: "Nuevo Anuncio",
				  contactLists: "Listas de Anuncios",
				},
				table: {
				  priority: "Prioridad",
				  title: "Título",
				  text: "Texto",
				  mediaName: "Archivo",
				  status: "Estado",
				  actions: "Acciones",
				},
				dialog: {
				  edit: "Edición de Anuncio",
				  add: "Nuevo Anuncio",
				  update: "Editar Anuncio",
				  readonly: "Solo Lectura",
				  form: {
					priority: "Prioridad",
					title: "Título",
					text: "Texto",
					mediaPath: "Archivo",
					status: "Estado",
				  },
				  buttons: {
					add: "Agregar",
					edit: "Actualizar",
					okadd: "Ok",
					cancel: "Cancelar",
					close: "Cerrar",
					attach: "Adjuntar Archivo",
				  },
				},
				confirmationModal: {
				  deleteTitle: "Eliminar",
				  deleteMessage: "Esta acción no se puede revertir.",
				},
				toasts: {
				  success: "Operación realizada con éxito",
				  deleted: "Registro eliminado",
				},
			  },
			  campaignsConfig: {
				title: "Configuraciones de Campañas",
			  },
			notifications: {
				noTickets: "Sin notificaciones.",
			},
			queues: {
				title: "Linhas",
				table: {
					name: "Nombre",
					color: "Color",
					greeting: "Mensaje de saludo",
					actions: "Comportamiento",
				},
				buttons: {
					add: "Agregar cola",
				},
				confirmationModal: {
					deleteTitle: "Eliminar",
					deleteMessage:
						"¿Estás seguro? ¡Esta acción no se puede revertir! Los tickets en esa cola seguirán existiendo, pero ya no tendrán ninguna cola asignada.",
				},
			},
			queueSelect: {
				inputLabel: "Linhas",
			},
			users: {
				title: "Usuarios",
				table: {
					name: "Nombre",
					email: "Correo Electrónico",
					profile: "Perfil",
					actions: "Acciones",
					startWork: "Empezar a trabajar",
					endWork: "Fin del trabajo",
				},
				buttons: {
					add: "Agregar usuario",
				},
				toasts: {
					deleted: "Usuario borrado satisfactoriamente.",
				},
				confirmationModal: {
					deleteTitle: "Borrar",
					deleteMessage:
						"Toda la información del usuario se perderá. Los tickets abiertos de los usuarios se moverán a la cola.",
				},
			},
			helps: {
				title: "Centro de Ayuda",
			  },
			  schedules: {
				title: "Agendamientos",
				confirmationModal: {
				  deleteTitle: "¿Estás seguro de que quieres eliminar este Agendamiento?",
				  deleteMessage: "Esta acción no se puede deshacer.",
				},
				table: {
				  contact: "Contacto",
				  body: "Mensaje",
				  sendAt: "Fecha de Agendamiento",
				  sentAt: "Fecha de Envío",
				  status: "Estado",
				  actions: "Acciones",
				},
				calendar: {
					date: "Fecha",
					time: "Hora",
					event: "Evento",
					allDay: "Todo el día",
					week: "Semana",
					work_week: "Agendamientos",
					day: "Día",
					month: "Mes",
					previous: "Anterior",
					next: "Siguiente",
					yesterday: "Ayer",
					tomorrow: "Mañana",
					today: "Hoy",
					agenda: "Agenda",
					noEventsInRange: "No hay eventos en el rango de fechas.",
				},				  
				buttons: {
				  add: "Nuevo Agendamiento",
				},
				toasts: {
				  deleted: "Agendamiento eliminado con éxito.",
				},
			  },
			  tags: {
				title: "Etiquetas",
				confirmationModal: {
				  deleteTitle: "¿Estás seguro de que quieres eliminar esta Etiqueta?",
				  deleteMessage: "Esta acción no se puede deshacer.",
				},
				table: {
				  name: "Nombre",
				  color: "Color",
				  tickets: "Registros Etiquetados",
				  actions: "Acciones",
				},
				buttons: {
				  add: "Nueva Etiqueta",
				},
				toasts: {
				  deleted: "Etiqueta eliminada con éxito.",
				},
			  },	
			  settings: {
				success: "Configuraciones guardadas exitosamente.",
				title: "Configuraciones",
				settings: {
					userCreation: {
						name: "Creación de usuario",
						options: {
							enabled: "Activado",
							disabled: "Desactivado",
						},
					},
					tabs: {
						options: "Opciones",
						schedules: "Horarios",
						companies: "Empresas",
						plans: "Planes",
						helps: "Ayuda",
					},
				},
			},			
			messagesList: {
				header: {
					assignedTo: "Asignado a:",
					buttons: {
						return: "Devolver",
						resolve: "Resolver",
						reopen: "Reabrir",
						accept: "Aceptar",
					},
				},
			},
			messagesInput: {
				placeholderOpen: "Escribe un mensaje",
				placeholderClosed:
					"Vuelva a abrir o acepte este ticket para enviar un mensaje.",
				signMessage: "Firmar",
			},
			contactDrawer: {
				header: "Detalles del contacto",
				buttons: {
					edit: "Editar contacto",
				},
				extraInfo: "Otra información",
			},
			fileModal: {
				title: {
				  add: "Agregar lista de archivos",
				  edit: "Editar lista de archivos",
				},
				buttons: {
				  okAdd: "Guardar",
				  okEdit: "Editar",
				  cancel: "Cancelar",
				  fileOptions: "Agregar archivo",
				},
				form: {
				  name: "Nombre de la lista de archivos",
				  message: "Detalles de la lista",
				  fileOptions: "Lista de archivos",
				  extraName: "Mensaje para enviar con el archivo",
				  extraValue: "Valor de la opción",
				},
				success: "Lista de archivos guardada exitosamente",
			  },
			  ticketOptionsMenu: {
				schedule: "Agendamiento",
				delete: "Eliminar",
				transfer: "Transferir",
				registerAppointment: "Observaciones del Contacto",
				appointmentsModal: {
				  title: "Observaciones del Contacto",
				  textarea: "Observación",
				  placeholder: "Ingrese aquí la información que desea registrar",
				},
			  },
			ticketOptionsMenu: {
				delete: "Borrar",
				transfer: "Transferir",
				confirmationModal: {
					title: "¿Borrar ticket #",
					titleFrom: "del contacto ",
					message:
						"¡Atención! Todos los mensajes Todos los mensajes relacionados con el ticket se perderán.",
				},
				buttons: {
					delete: "Borrar",
					cancel: "Cancelar",
				},
			},
			confirmationModal: {
				buttons: {
					confirm: "Ok",
					cancel: "Cancelar",
				},
			},
			messageOptionsMenu: {
				delete: "Borrar",
				reply: "Responder",
				confirmationModal: {
					title: "¿Borrar mensaje?",
					message: "Esta acción no puede ser revertida.",
				},
			},
			backendErrors: {
				ERR_NO_OTHER_WHATSAPP:
					"Debe haber al menos una conexión de WhatsApp predeterminada.",
				ERR_NO_DEF_WAPP_FOUND:
					"No se encontró WhatsApp predeterminado. Verifique la página de conexiones.",
				ERR_WAPP_NOT_INITIALIZED:
					"Esta sesión de WhatsApp no ​​está inicializada. Verifique la página de conexiones.",
				ERR_WAPP_CHECK_CONTACT:
					"No se pudo verificar el contacto de WhatsApp. Verifique la página de conexiones.",
				ERR_WAPP_INVALID_CONTACT: "Este no es un número de whatsapp válido.",
				ERR_WAPP_DOWNLOAD_MEDIA:
					"No se pudieron descargar los medios de WhatsApp. Verifique la página de conexiones.",
				ERR_INVALID_CREDENTIALS: "Error de autenticación. Vuelva a intentarlo.",
				ERR_SENDING_WAPP_MSG:
					"Error al enviar el mensaje de WhatsApp. Verifique la página de conexiones.",
				ERR_DELETE_WAPP_MSG: "No se pudo borrar el mensaje de WhatsApp.",
				ERR_OTHER_OPEN_TICKET: "Ya hay un ticket abierto para este contacto.",
				ERR_SESSION_EXPIRED: "Sesión caducada. Inicie sesión.",
				ERR_USER_CREATION_DISABLED:
					"La creación de usuarios fue deshabilitada por el administrador.",
				ERR_NO_PERMISSION: "No tienes permiso para acceder a este recurso.",
				ERR_DUPLICATED_CONTACT: "Ya existe un contacto con este número.",
				ERR_NO_SETTING_FOUND:
					"No se encontró ninguna configuración con este ID.",
				ERR_NO_CONTACT_FOUND: "No se encontró ningún contacto con este ID.",
				ERR_NO_TICKET_FOUND: "No se encontró ningún ticket con este ID.",
				ERR_NO_USER_FOUND: "No se encontró ningún usuario con este ID.",
				ERR_NO_WAPP_FOUND: "No se encontró WhatsApp con este ID.",
				ERR_CREATING_MESSAGE: "Error al crear el mensaje en la base de datos.",
				ERR_CREATING_TICKET: "Error al crear el ticket en la base de datos.",
				ERR_FETCH_WAPP_MSG:
					"Error al obtener el mensaje en WhtasApp, tal vez sea demasiado antiguo.",
				ERR_QUEUE_COLOR_ALREADY_EXISTS:
					"Este color ya está en uso, elija otro.",
				ERR_WAPP_GREETING_REQUIRED:
					"El mensaje de saludo es obligatorio cuando hay más de una cola.",
			},
		},
	},
};

export { messages };
