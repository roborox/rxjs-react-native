import React from "react"
import { Observable } from "rxjs"
import { Text, TextProps } from "react-native"
import { useRx } from "@roborox/rxjs-react/build/use-rx"

interface Props<T> extends TextProps {
	children: Observable<T>
}

export function RxText<T>({ children, ...rest }: Props<T>) {
	const value = useRx(children)
	return <Text {...rest}>{value}</Text>
}
