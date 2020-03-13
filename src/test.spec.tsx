import "@testing-library/jest-native/extend-expect"
import { act, render } from "@testing-library/react-native"
import { RxText } from "./text"
import { Atom } from "@grammarly/focal/dist/_cjs/src/atom"
import React from "react"

describe("RxText", () => {
	test("should render reactive test and observe changes", async () => {
		const atom = Atom.create("initial")
		const r = render(<RxText testID="text" value={atom}/>)
		expect(r.getByTestId("text").getProp("children")).toBe("initial")
		act(() => atom.set("new value"))
		expect(r.getByTestId("text").getProp("children")).toBe("new value")
	})
})
