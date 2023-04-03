/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Channels = "channels",
	DirectMessages = "directMessages",
	FileUploads = "fileUploads",
	FriendRequest = "friendRequest",
	Friends = "friends",
	Likes = "likes",
	Members = "members",
	Messages = "messages",
	Servers = "servers",
	Users = "users",
	UsersStatus = "usersStatus",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

export type ViewSystemFields<T = never> = {
  	id: RecordIdString
  	collectionId: string
  	collectionName: Collections
  	expand?: T
}

// Record types for each collection

export type ChannelsRecord = {
	members?: RecordIdString[]
	messages?: RecordIdString[]
	title?: string
	server?: RecordIdString
}

export type DirectMessagesRecord = {
	from: RecordIdString
	to: RecordIdString
	files?: string[]
	content: HTMLString
}

export enum FileUploadsStatusOptions {
	"uploaded" = "uploaded",
	"rejected" = "rejected",
	"pending" = "pending",
}
export type FileUploadsRecord = {
	file?: string[]
	url?: string
	user: RecordIdString
	status?: FileUploadsStatusOptions
}

export enum FriendRequestStatusOptions {
	"pending" = "pending",
	"declined" = "declined",
	"accepted" = "accepted",
}
export type FriendRequestRecord = {
	senderId: RecordIdString
	receiverId: RecordIdString
	status?: FriendRequestStatusOptions
}

export type FriendsRecord = {
	user: RecordIdString
	friends?: RecordIdString[]
}

export type LikesRecord = {
	message: RecordIdString
	user: RecordIdString
}

export type MembersRecord = {
	user: RecordIdString
	server: RecordIdString
}

export type MessagesRecord = {
	user: RecordIdString
	channel?: RecordIdString
	content?: HTMLString
	files?: string[]
}

export type ServersRecord = {
	image?: RecordIdString
	name: string
	description?: string
	members?: RecordIdString[]
	owner?: RecordIdString
	private?: boolean
}

export type UsersRecord = {
	currentChannel?: RecordIdString
	avatar?: string
	avatarUrl?: string
	onlineStatus?: RecordIdString
}

export type UsersStatusRecord = {
	isOnline?: boolean
	user: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type ChannelsResponse<Texpand = unknown> = ChannelsRecord & BaseSystemFields<Texpand>
export type DirectMessagesResponse<Texpand = unknown> = DirectMessagesRecord & BaseSystemFields<Texpand>
export type FileUploadsResponse<Texpand = unknown> = FileUploadsRecord & BaseSystemFields<Texpand>
export type FriendRequestResponse<Texpand = unknown> = FriendRequestRecord & BaseSystemFields<Texpand>
export type FriendsResponse<Texpand = unknown> = FriendsRecord & BaseSystemFields<Texpand>
export type LikesResponse<Texpand = unknown> = LikesRecord & BaseSystemFields<Texpand>
export type MembersResponse<Texpand = unknown> = MembersRecord & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = MessagesRecord & BaseSystemFields<Texpand>
export type ServersResponse<Texpand = unknown> = ServersRecord & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = UsersRecord & AuthSystemFields<Texpand>
export type UsersStatusResponse<Texpand = unknown> = UsersStatusRecord & BaseSystemFields<Texpand>

export type CollectionRecords = {
	channels: ChannelsRecord
	directMessages: DirectMessagesRecord
	fileUploads: FileUploadsRecord
	friendRequest: FriendRequestRecord
	friends: FriendsRecord
	likes: LikesRecord
	members: MembersRecord
	messages: MessagesRecord
	servers: ServersRecord
	users: UsersRecord
	usersStatus: UsersStatusRecord
}