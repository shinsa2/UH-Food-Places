/** Dennis Kim added this .jsx
    With some inline css for the footer specifically,
    has some non-important information for the footer of the website.
*/

import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const fix = {
      display: 'block',
      padding: '10px',
      height: '20px',
      width: '100%',
      background: 'gray',
    };
    const divStyle = { color: 'white' };
    const background = { background: 'gray', width: '100%' };
    return (
        <footer>
          <div style={fix}/>
            <div style={divStyle} className="footer">
              <div style={background}>
                <Grid container stackable centered columns={1}>
                  <div className='footer-text'>
                    <Icon name='copyright outline'/>
                    No Copyright since 2020<br/>
                    UH Food Places Inc. All rights not reserved.<br/>
                    University of Hawaii at Manoa<br/>
                    Honolulu, HI 96822
                  </div>
                </Grid>
              </div>
            </div>
        </footer>
    );
  }
}

export default Footer;
