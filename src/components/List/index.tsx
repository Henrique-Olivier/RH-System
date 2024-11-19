import React from "react";
import { variant } from "./types";
import { OlListWrapper } from "./style";
import { UlListWrapper } from "./style";

function showList(style: variant , children: React.ReactElement<HTMLLIElement>[]) {
    if(style === "numbered") {
        return React.Children.map(children, (child) => (
            <div><div className="marked">{children.indexOf(child)+1}. </div>{child}</div>
        ))
    } else {
        return React.Children.map(children, (child) => (
            <div><div className="marked"></div>{child}</div>
        ))
    }
}

function List({ style, children }: { style: variant, children: React.ReactElement<HTMLLIElement>[]}){
    return(
        style === "marked" ?
        <UlListWrapper>
            {showList(style, children)}
        </UlListWrapper>
        :
        <OlListWrapper>
            {showList(style, children)}
        </OlListWrapper>
    );
};

export default List;