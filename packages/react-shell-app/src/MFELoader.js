import React from "react";
import Skeleton from "react-loading-skeleton";
import loadModule from "./loadModule";

class MFELoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.config,
      error: null,
      stylesLoadCount: 0,
      scriptsLoadCount: 0
    };
  }

  componentDidMount() {
    const { styles, scripts } = this.props.config;
    styles.forEach(style => {
      loadModule(
        style,
        "css",
        "",
        null,
        () => {
          // Work to do after the library loads.
          this.setState({
            stylesLoadCount: this.state.stylesLoadCount + 1
          });
        },
        () => {
          console.log("Unable to load global styles");
          this.setState({
            status: {
              error: `Unable to load style ${style}`
            }
          });
        }
      );
    });

    scripts.forEach(bundle => {
      loadModule(
        bundle.src,
        null,
        `${bundle.target}App`,
        bundle.target,
        () => {
          // Work to do after the library loads.
          this.setState({
            scriptsLoadCount: this.state.scriptsLoadCount + 1
          });
        },
        () => {
          console.log("Unable to load global styles");

          this.setState({
            status: {
              error: `Unable to load script ${bundle.src}`
            }
          });
        }
      );
    });
  }

  isLoaded() {
    const { scripts } = this.props.config;
    const { scriptsLoadCount } = this.state;
    return scripts.length === scriptsLoadCount;
  }
  render() {
    const { children } = this.props;
    return (
      <>
        {!this.isLoaded() && (
          <div
            style={{
              fontSize: "20rem",
              padding: 5,
              margin: 0,
              lineHeight: 0
            }}
          >
            <Skeleton />
          </div>
        )}
        {this.isLoaded() && children}
      </>
    );
  }
}

export default MFELoader;
