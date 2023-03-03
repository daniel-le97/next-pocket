/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Channels = "channels",
	DirectMessages = "directMessages",
	FriendRequest = "friendRequest",
	Friends = "friends",
	Membership = "membership",
	Messages = "messages",
	Rooms = "rooms",
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
	messages?: RecordIdString
	title?: string
	server?: RecordIdString
}

export type DirectMessagesRecord = {
	from: RecordIdString
	to: RecordIdString
	message: string
	files?: string[]
}

export enum FriendRequestStatusOptions {
	"pending" = "pending",
	"declined" = "declined",
	"accepted" = "accepted",
}
export type FriendRequestRecord = {
	from: RecordIdString
	to: RecordIdString
	friends: string
	status?: FriendRequestStatusOptions
}

export type FriendsRecord = {
	user: RecordIdString
	friends?: RecordIdString[]
}

export type MembershipRecord = {
	serverId: RecordIdString
	userId: RecordIdString
}

export type MessagesRecord = {
	text: string
	user: RecordIdString
	channel?: RecordIdString
}

export type RoomsRecord = {
	messages?: RecordIdString
	title?: string
}

export type ServersRecord = {
	name: string
	image?: string
	description?: string
	members?: RecordIdString[]
	imageUrl?: string
}

export type UsersRecord = {
	currentChannel?: RecordIdString
	avatar?: string
	avatarUrl?: string
}

export type UsersStatusRecord = {
	userId?: string
	isOnline?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type ChannelsResponse<Texpand = unknown> = ChannelsRecord & BaseSystemFields<Texpand>
export type DirectMessagesResponse<Texpand = unknown> = DirectMessagesRecord & BaseSystemFields<Texpand>
export type FriendRequestResponse<Texpand = unknown> = FriendRequestRecord & BaseSystemFields<Texpand>
export type FriendsResponse<Texpand = unknown> = FriendsRecord & BaseSystemFields<Texpand>
export type MembershipResponse<Texpand = unknown> = MembershipRecord & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = MessagesRecord & BaseSystemFields<Texpand>
export type RoomsResponse<Texpand = unknown> = RoomsRecord & BaseSystemFields<Texpand>
export type ServersResponse<Texpand = unknown> = ServersRecord & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = UsersRecord & AuthSystemFields<Texpand>
export type UsersStatusResponse = UsersStatusRecord & BaseSystemFields

export type CollectionRecords = {
	channels: ChannelsRecord
	directMessages: DirectMessagesRecord
	friendRequest: FriendRequestRecord
	friends: FriendsRecord
	membership: MembershipRecord
	messages: MessagesRecord
	rooms: RoomsRecord
	servers: ServersRecord
	users: UsersRecord
	usersStatus: UsersStatusRecord
}