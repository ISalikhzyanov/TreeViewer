import React, {useRef, useEffect} from "react";
import {select, hierarchy, tree, linkHorizontal} from "d3";
import useResizeObserver from "./useResizeObserver";

function TreeChart({data}) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimensions) return;

        const root = hierarchy(data);
        const treeLayout = tree().size([dimensions.height, dimensions.width]);
        treeLayout(root);

        console.log(root.descendants());
        console.log(root.links())

        const linkGenerator = linkHorizontal()
            .x(node => node.y)
            .y(node=> node.x)


        svg.selectAll(".link")
            .data(root.links())
            .join("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("d", linkGenerator)

        svg.selectAll(".label")
            .data(root.descendants())
            .join("text")
            .attr("class","label")
            .text(node=> node.data.title)
            .attr("text-anchor", "center")
            .attr("font-size", 24)
            .attr("x",node=>node.y)
            .attr("y",node=>node.x-20)

    }, [data, dimensions])

    return (
        <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}/>
        </div>
    );
}

export default TreeChart;
