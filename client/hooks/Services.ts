import { authsService } from "../src/services/AuthsService";
import { membersService } from "../src/services/MembersService";
import { messageService } from "../src/services/MessageService";
import { serversService } from "../src/services/ServersService";
import { uploadService } from "../src/services/UploadService";
import { userService } from "../src/services/UserService";

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
