import { authsService } from "../src/services/AuthsService";
import { membersService } from "../src/services/MembersService";
import { messageService } from "../src/services/MessagesService";
import { serversService } from "../src/services/ServersService";
import { uploadService } from "../src/services/UploadsService";
import { userService } from "../src/services/UsersService";

const services = {
  members: membersService,
  auth: authsService,
  servers: serversService,
  uploads: uploadService,
  messages: messageService,
  user: userService
};

export const useService = () => {
  return services;
};
