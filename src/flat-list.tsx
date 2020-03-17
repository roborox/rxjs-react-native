import React, { useCallback, useMemo } from "react"
import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native"
import { Observable, of } from "rxjs"
import { useRx } from "@roborox/rxjs-react/build"
import { filter } from "rxjs/operators"
import { List } from "list/methods"

export interface RxListRenderItemInfo<T> extends ListRenderItemInfo<T> {
	first: boolean
	last: boolean
}

export type RxListRenderItem<T> = (info: RxListRenderItemInfo<T>) => React.ReactElement | null

function ifDefined<T>(observable: Observable<T | undefined>): Observable<T> {
	return observable.pipe(filter((x) => x !== undefined)) as Observable<T>
}

export interface RxFlatListProps<T> extends Omit<FlatListProps<T>, "data" | "renderItem" | "refreshControl" | "refreshing"> {
	data: Observable<List<T> | T[] | undefined | null>
	renderItem: RxListRenderItem<T>
	refreshing?: Observable<boolean>
}

export function RxFlatList<T>({ data, renderItem: render, refreshing = of(false), ...rest }: RxFlatListProps<T>) {
	const list = useRx(ifDefined(data))
	const isRefreshing = useRx(refreshing, false)

	const renderItem = useCallback((item: ListRenderItemInfo<T>) => render({
		...item,
		first: item.index === 0,
		last: item.index + 1 === list?.length,
	}), [list])

	const itemsArray = useMemo(() => Array.isArray(list) ? list : list?.toJSON(), [list])

	if (!itemsArray) {
		return null
	}

	return <FlatList data={itemsArray} renderItem={renderItem} refreshing={isRefreshing} {...rest} />
}
