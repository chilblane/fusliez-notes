import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IView } from "utils/types";
import React from "react";
import useStyles from "./SlideDrawer.styles";
import cx from "classnames";

export interface ISideDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
  views: Array<IView>;
  setActiveView: (value: IView) => void;
}

export default function SlideDrawer(
  props: ISideDrawerProps
): JSX.Element | null {
  const classes = useStyles();

  const { isDrawerOpen, setIsDrawerOpen, views, setActiveView } = props;

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleHideDrawer(event: Event) {
      if (ref.current && !ref?.current?.contains(event.target as Node)) {
        setIsDrawerOpen(false);
      }
    }
    document.addEventListener("click", handleHideDrawer, true);

    return () => {
      document.removeEventListener("click", handleHideDrawer, true);
    };
  }, []);

  const handleChangeActiveView = (view: IView) => {
    setActiveView(view);

    setIsDrawerOpen(false);
  };
  return (
    <React.Fragment>
      <div
        className={cx(classes.Backdrop, {
          [classes.isBackdropOpen]: isDrawerOpen,
        })}
      />
      <div
        className={cx(classes.SlideDrawer, {
          [classes.isDrawerOpen]: isDrawerOpen,
        })}
        ref={ref}
      >
        <div className={classes.SlideDrawerContent}>
          <div className={classes.SlideDrawerHeader}>
            <div>
              <h1>fusliez notes</h1>
              <h2>(an Among Us companion app)</h2>
            </div>
            <button
              className={classes.SlideDrawerClose}
              onClick={() => setIsDrawerOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <ul className={classes.SlideDrawerNav}>
            {views.map((view, index) => (
              <li
                key={index}
                className={classes.SlideDrawerNavItem}
                onClick={() => handleChangeActiveView(view)}
              >
                {view.title}
              </li>
            ))}
          </ul>
        </div>
        <img
          className={classes.SlideDrawerEmote}
          src="assets/images/amongNotes.gif"
          alt="Among Us animated gif emote"
        />
      </div>
    </React.Fragment>
  );
}
