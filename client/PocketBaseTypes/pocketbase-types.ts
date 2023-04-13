/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Channels = "channels",
	DirectMessages = "directMessages",
	FileUploads = "fileUploads",
	Friends = "friends",
	Likes = "likes",
	Members = "members",
	Messages = "messages",
	Servers = "servers",
	Tests = "tests",
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
	title?: string
	server?: RecordIdString
}

export type DirectMessagesRecord = {
	user: RecordIdString
	content: HTMLString
	friendRecord: RecordIdString
	attachments?: RecordIdString[]
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
	directMessage?: RecordIdString
	message?: RecordIdString
}

export enum FriendsStatusOptions {
	"accepted" = "accepted",
	"pending" = "pending",
	"blocked" = "blocked",
}
export type FriendsRecord = {
	friends: RecordIdString[]
	status?: FriendsStatusOptions
	blocker?: RecordIdString
}

export type LikesRecord = {
	message: RecordIdString
	user: RecordIdString
	directMessage?: RecordIdString
}

export type MembersRecord = {
	user: RecordIdString
	server: RecordIdString
}

export type MessagesRecord = {
	user: RecordIdString
	channel?: RecordIdString
	content?: HTMLString
	attachments?: RecordIdString[]
}

export type ServersRecord = {
	image?: RecordIdString
	name: string
	description?: string
	members?: RecordIdString[]
	owner?: RecordIdString
	private?: boolean
}

export type TestsRecord = {
	test?: string
	user?: RecordIdString
}

export type UsersRecord = {
	currentChannel?: RecordIdString
	avatar?: string
	avatarUrl?: string
	onlineStatus?: RecordIdString
}

export enum UsersStatusStatusOptions {
	"online" = "online",
	"away" = "away",
	"offline" = "offline",
}
export type UsersStatusRecord = {
	user: RecordIdString
	status?: UsersStatusStatusOptions
	currentChannel?: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type ChannelsResponse<Texpand = unknown> = ChannelsRecord & BaseSystemFields<Texpand>
export type DirectMessagesResponse<Texpand = unknown> = DirectMessagesRecord & BaseSystemFields<Texpand>
export type FileUploadsResponse<Texpand = unknown> = FileUploadsRecord & BaseSystemFields<Texpand>
export type FriendsResponse<Texpand = unknown> = FriendsRecord & BaseSystemFields<Texpand>
export type LikesResponse<Texpand = unknown> = LikesRecord & BaseSystemFields<Texpand>
export type MembersResponse<Texpand = unknown> = MembersRecord & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = MessagesRecord & BaseSystemFields<Texpand>
export type ServersResponse<Texpand = unknown> = ServersRecord & BaseSystemFields<Texpand>
export type TestsResponse<Texpand = unknown> = TestsRecord & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = UsersRecord & AuthSystemFields<Texpand>
export type UsersStatusResponse<Texpand = unknown> = UsersStatusRecord & BaseSystemFields<Texpand>

export type CollectionRecords = {
	channels: ChannelsRecord
	directMessages: DirectMessagesRecord
	fileUploads: FileUploadsRecord
	friends: FriendsRecord
	likes: LikesRecord
	members: MembersRecord
	messages: MessagesRecord
	servers: ServersRecord
	tests: TestsRecord
	users: UsersRecord
	usersStatus: UsersStatusRecord
}