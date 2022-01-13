export enum Permission {
  USER = 'USER', // normal user
  OWNER = 'OWNER', // can all
  ADMIN = 'ADMIN', // admin all but could be removed
  EDITOR = 'EDITOR', // can edit but not invite
  WATCHER = 'WATCHER', // can watch but not edit
}

export default Permission
