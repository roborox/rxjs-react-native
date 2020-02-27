import React from "react"
import {FlatList, FlatListProps} from "react-native"
import {Observable} from "rxjs"
import {useRx} from "@roborox/rxjs-react/build"
import {filter} from "rxjs/operators"
import {List} from "list/methods"

interface RxFlatListProps<T> extends Omit<FlatListProps<T>, "data"> {
	data: Observable<List<T> | T[] | undefined>
}

function ifDefined<T>(observable: Observable<T | undefined>): Observable<T> {
	return observable.pipe(filter((x) => x !== undefined)) as Observable<T>
}

export function RxFlatList<T>({ data, ...rest }: RxFlatListProps<T>) {
	const list = useRx(ifDefined(data))
	if (list !== null) {
		let array: T[]
		if (list instanceof Array) {
			array = list
		} else {
			array = list.toJSON()
		}
		return <FlatList data={array} {...rest} />
	}
	return null
}
