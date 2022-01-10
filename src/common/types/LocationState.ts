export interface LocationState {}

export interface Location {
  hash: string
  key: string
  pathname: string
  search: string
  state: LocationState | null
}

export default Location
