import LineComplete from "../assets/line-complete.svg";
import LineError from "../assets/line-error.svg";
import CircleComplete from "../assets/circle-complete.svg";
import CircleError from "../assets/circle-error.svg";
import * as Types from './types.ts' 
import * as Style from './style.ts' 


export default function ProgressBar({
  percents,
  type = 'line',
  style = 'default',
}: Types.ProgressBarProps) {
  if (type == "line" || type == "smallLine") {
    return (
      <Style.StyledDiv>
        <Style.StyledProgress
          value={percents}
          max="100"
          $type={type}
          $style={style}
        ></Style.StyledProgress>
        {style == "percent" && <p>{percents}%</p>}
        {style == "complete" && <img src={LineComplete} />}
        {style == "error" && <img src={LineError} />}
      </Style.StyledDiv>
    );
  }

  if (type == "smallCircle") {
    return (
      <Style.CircularProgress $size="small">
        <svg width="84" height="84" viewBox="0 0 84 84">
          <Style.CircleBg cx="42" cy="42" r="33.5" />
          <Style.Progress
            $percentage={percents}
            $size="small"
            $style={style}
            cx="42"
            cy="42"
            r="33.5"
          />
        </svg>
        {style == "percent" && <Style.PercentText $size="small">{percents}%</Style.PercentText>}
        {style == "complete" && <Style.CircleImg $size="small" src={CircleComplete}/>}
        {style == "error" && <Style.CircleImg $size="small" src={CircleError}/>}
      </Style.CircularProgress>
    );
  }
  if (type == "circle") {
    return (
      <Style.CircularProgress $size="large">
        <svg width="140" height="140" viewBox="0 0 160 160">
          <Style.CircleBg cx="80" cy="80" r="70" />
          <Style.Progress
            $percentage={percents}
            $size="large"
            $style={style}
            cx="80"
            cy="80"
            r="70"
          />
        </svg>
        {style == "percent" && <Style.PercentText $size="large">{percents}%</Style.PercentText>}
        {style == "complete" && <Style.CircleImg $size="large" src={CircleComplete}/>}
        {style == "error" && <Style.CircleImg $size="large" src={CircleError}/>}
      </Style.CircularProgress>
    );
  }
}
