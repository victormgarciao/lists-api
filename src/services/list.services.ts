import { ListsData } from '../types'
import listsDataFromJson from './lists.json'

const listsData: ListsData = listsDataFromJson

export function getEntries (): ListsData {
  return listsData
}

export function searchLists (): null {
  return null
}
