import React, {useRef, useEffect, useState} from "react";
import {select, hierarchy, tree, linkHorizontal} from "d3";
import useResizeObserver from "./useResizeObserver";

function TreeChart({data}) {
    let text = {};
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

        svg.selectAll(".node")
            .data(root.descendants())
            .join("circle")
            .text(node=>node.data.title)
            .attr("class", "node")
            .attr("r", 15)
            .attr("fill", "black")
            .attr("cx", node => node.y)
            .attr("cy", node => node.x-181);

    }, [data, dimensions])

    return (
        <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef} onClick={(e)=>{
                text = e.target
                window.alert(text.innerHTML)
            }}/>
        </div>
    );
}

export default TreeChart;
