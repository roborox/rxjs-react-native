import React from "react"
import { Observable } from "rxjs"
import { Text, TextProps } from "react-native"
import { useRx } from "@roborox/rxjs-react/build/use-rx"

export interface RxTextProps<T> extends TextProps {
	value: Observable<T>
}

export function RxText<T extends string | number>({ value, ...rest }: RxTextProps<T>) {
	const raw = useRx(value)
	return <Text {...rest}>{raw}</Text>
}