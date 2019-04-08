import {OrderedMap, Map} from 'immutable'

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
        acc.set(item.id, new DataRecord(item)), new OrderedMap({}))
}

export function arrToMapDeep(arr, DataRecord = Map, propToMap, DeepDataRecord = Map) {
  return arr.reduce((acc, item) =>
      acc.set(item.id, new DataRecord({...item, [propToMap] : arrToMap(item[propToMap], DeepDataRecord)})), new OrderedMap({}))
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray()
}
