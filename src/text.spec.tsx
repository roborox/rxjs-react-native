import { act, render } from "@testing-library/react-native"
import { Atom } from "@grammarly/focal"
import { RxText } from "./text"
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
