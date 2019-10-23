import { Helmet } from "react-helmet";
import { string } from "prop-types";
import React from "react";

class HelmetWrapper extends React.PureComponent {

    render() {
        const { title, name, description } = this.props;

        return (
            <Helmet>
                <title>{title}</title>
                <meta itemProp="name" content={name}/>
                <meta name="description" content={description}/>
                <meta itemProp="description" content={description}/>
                {/* <meta itemProp="image" content="https://www.app.com/assets/images/app-social.jpg"/> */}

                {/* <meta name="twitter:title" content={title}/> */}
                {/* <meta name="twitter:card" content="summary_large_image"/> */}
                {/* <meta name="twitter:site" content="@publisher_handle"/> */}
                {/* <meta name="twitter:description" content={description}/> */}
                {/* <meta name="twitter:image:src" content="https://www.app.com/assets/images/app-social.jpg"/> */}
                {/* <meta name="twitter:image:alt" content={title}/> */}

                {/* <meta property="og:title" content={title}/> */}
                {/* <meta property="og:url" content="https://www.app.com/"/> */}
                {/* <meta property="og:image" content="https://www.app.com/assets/images/app-social.jpg"/> */}
                {/* <meta property="og:description" content={description}/> */}
                {/* <meta property="og:site_name" content="PROJECTNAME.com"/> */}
                {/* <meta property="og:type" content="website"/> */}
                {/* <meta property="fb:app_id" content="000000000000000000"/> */}
            </Helmet>
        );
    }
}

HelmetWrapper.propTypes = {
    title: string.isRequired,
    name: string.isRequired,
    description: string.isRequired,
};

export default HelmetWrapper;
