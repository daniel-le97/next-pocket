
# Services

This directory is for an abstraction over pocketbase js usage




## example

### UsersService

```ts
class UsersService {
  async update(userData: UsersResponse) {
    // this will update pb.authStore.model
    // automatically so no need to reset State
    const res = await pb
    .collection(Collections.Users)
    .update(userData.id, userData);
  }

  async getAll() {
    // get all users and set users state
    const res = await pb
    .collection(Collections.Users)
    .getFullList<UsersResponse>(200);
    AppState.users = res;
    return AppState.users;
  }

  async getById(id: string){
    // automatically throws an error if not found
      const res = await pb
      .collection(Collections.Users)
      .getOne<UsersResponse>(id)

      AppState.activeUser = res
  }


}
export const usersService = new UsersService();
```

