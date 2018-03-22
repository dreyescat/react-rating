// Type definitions for react-rating 1.0.6 by <https://github.com/dreyescat/>
// Project: https://github.com/dreyescat/react-rating
// Definitions by: Konrad Szwarc <https://github.com/szwarckonrad/>

import {Dictionary} from "lodash";
import * as React from "react";

declare class Rating extends React.Component<RatingComponentProps> {}
declare namespace Rating {}

type RatingComponentSymbol = string | string[] | Dictionary<any> | Dictionary<any>[] | JSX.Element[] | JSX.Element ;

interface RatingComponentProps {
    start?: number;
    stop?: number;
    step?: number;
    fractions?: number;
    initialRating?: number;
    placeholderRating?: number;
    readonly?: boolean;
    quiet?: boolean;
    direction?: "rtl" | "ltr";
    emptySymbol?: RatingComponentSymbol;
    fullSymbol?: RatingComponentSymbol;
    placeholderSymbol?: RatingComponentSymbol;
    onChange?: (value: number) => any;
    onHover?: (value: number) => any;
}

export default Rating;
