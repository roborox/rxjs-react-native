import React from "react"
import { Observable } from "rxjs"
import { Text, TextProps } from "react-native"
import { useRx } from "@roborox/rxjs-react/build/use-rx"

interface Props<T> extends TextProps {
	value: Observable<T>
}

export function RxText<T>({ value, ...rest }: Props<T>) {
	const v = useRx(value)
	return <Text {...rest}>{v}</Text>
}
