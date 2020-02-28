import React, { useCallback } from "react"
import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native"
import { Observable } from "rxjs"
import { useRx } from "@roborox/rxjs-react/build"
import { filter } from "rxjs/operators"
import { List } from "list/methods"

export interface RxListRenderItemInfo<T> extends ListRenderItemInfo<T> {
	first: boolean
	last: boolean
}

export type RxListRenderItem<ItemT> = (info: RxListRenderItemInfo<ItemT>) => React.ReactElement | null

interface RxFlatListProps<T> extends Omit<FlatListProps<T>, "data" | "renderItem"> {
	data: Observable<List<T> | T[] | undefined>
	renderItem: RxListRenderItem<T>
}

function ifDefined<T>(observable: Observable<T | undefined>): Observable<T> {
	return observable.pipe(filter((x) => x !== undefined)) as Observable<T>
}

export function RxFlatList<T>({ data, renderItem, ...rest }: RxFlatListProps<T>) {
	const list = useRx(ifDefined(data))
	const newRenderItem = useCallback((item: ListRenderItemInfo<T>) => {
		return renderItem({...item, first: item.index === 0, last: (item.index + 1 === list?.length)})
	}, [list])

	if (list !== null) {
		let array: T[]
		if (list instanceof Array) {
			array = list
		} else {
			array = list.toJSON()
		}
		return <FlatList data={array} renderItem={newRenderItem} {...rest} />
	}
	return null
}
