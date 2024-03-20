import React, { useState, useContext } from "react";

import MenuItem from "@material-ui/core/MenuItem";

import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import ConfirmationModal from "../ConfirmationModal";
import { Menu } from "@material-ui/core";
import { ReplyMessageContext } from "../../context/ReplyingMessage/ReplyingMessageContext";
import toastError from "../../errors/toastError";
import ForwardMessageModal from "../ForwardMessageModal";

const MessageOptionsMenu = ({ 
	message, 
  	menuOpen, 
  	handleClose, 
  	anchorEl, 
  	setShowSelectCheckbox, 
  	showSelectCheckBox, 
  	forwardMessageModalOpen, 
  	setForwardMessageModalOpen,
  	selectedMessages,
 }) => {
	const { setReplyingMessage } = useContext(ReplyMessageContext);
	const [confirmationOpen, setConfirmationOpen] = useState(false);

	const handleDeleteMessage = async () => {
		try {
			await api.delete(`/messages/${message.id}`);
		} catch (err) {
			toastError(err);
		}
	};
	
	const handleSetShowSelectCheckbox = () => {
		setShowSelectCheckbox(!showSelectCheckBox);
		handleClose();
	};

	const hanldeReplyMessage = () => {
		setReplyingMessage(message);
		handleClose();
	};

	const handleOpenConfirmationModal = e => {
		setConfirmationOpen(true);
		handleClose();
	};
	
	const handleForwardModal = () => {
		setForwardMessageModalOpen(true);
		handleClose();
	};

	return (
		<>
		 <ForwardMessageModal
				modalOpen={forwardMessageModalOpen}
				onClose={(e) => setForwardMessageModalOpen(false)}
				message={message}
				onClose={(e) => {
					setForwardMessageModalOpen(false);
					setShowSelectCheckbox(false);
				}}
				messages={selectedMessages}
			/>
			<ConfirmationModal
				title={i18n.t("messageOptionsMenu.confirmationModal.title")}
				open={confirmationOpen}
				onClose={setConfirmationOpen}
				onConfirm={handleDeleteMessage}
			>
				{i18n.t("messageOptionsMenu.confirmationModal.message")}
			</ConfirmationModal>
			<Menu
				anchorEl={anchorEl}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={menuOpen}
				onClose={handleClose}
			>
				{message.fromMe && (
					<MenuItem onClick={handleOpenConfirmationModal}>
						{i18n.t("messageOptionsMenu.delete")}
					</MenuItem>
				)}
				<MenuItem onClick={hanldeReplyMessage}>
					{i18n.t("messageOptionsMenu.reply")}
				</MenuItem>
				<MenuItem onClick={handleSetShowSelectCheckbox}>
					Selecionar para encaminhar
				</MenuItem>
			</Menu>
		</>
	);
};

export default MessageOptionsMenu;