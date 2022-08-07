import React, {useRef, useEffect, useState, useSyncExternalStore} from "react";
import {select, hierarchy, tree} from "d3";
import useResizeObserver from "./useResizeObserver";

function TreeChart({data}) {
    const dataset = [];
    dataset.push(data)
    const [text,setText] = useState(undefined)
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


        svg.selectAll(".node")
            .data(root.descendants())
            .join("circle")
            .text(node=>node.data.title)
            .attr("class", "node")
            .attr("r", 15)
            .attr("fill", "black")
            .attr("cx", node => node.y)
            .attr("cy", node => node.x-432);

    }, [data, dimensions])
    function getAllParentThisNode(dataset, nodeTittle)
    {
        let parents = []
        const TreeModel = require('tree-model'),
            tree = new TreeModel();
        dataset.forEach(element => {
            let rootMain = tree.parse(element);
            rootMain.walk(function (node) {
                if (node.model.title === nodeTittle) {
                    let x = node.getPath()
                    x.forEach(element => {
                            parents.push(element.model.title)
                        }
                    )
                }
            });
        })
        return parents
    }
    const getInner = (e)=>{
        setText(e.target)
    }
    useEffect(()=>{
        if (text){
        window.alert(getAllParentThisNode(dataset, text.innerHTML))}
    },[text])


    return (
        <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef} onClick={getInner}/>
        </div>
    );
}

export default TreeChart;
