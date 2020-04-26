import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';


/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    return (
        <div className='landing-background'>
          <Grid container stackable centered columns={1}>
            <Grid.Column textAlign={'center'}>
              <Grid.Row className="title-main">
                <p className="main-text">
                  We strive to satisfy UH Manoa students by providing choices of restaurants available on campus!
                </p>
              </Grid.Row>
              <Grid.Row>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/dZ4vVhYKoBU" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
              </Grid.Row>
            </Grid.Column>
          </Grid>
          <Grid container stackable centered columns={3}>
            <Grid.Column textAlign={'center'}>
              <Card>
                <Card.Content>
                  <Card.Header>L&L Hawaiian Barbecue</Card.Header>
                  <Image size='medium'
                         src='https://s3-media2.fl.yelpcdn.com/bphoto/9yZqa-ZIw7nmYKhxdW1_Zw/348s.jpg'/>
                  <Card.Description>
                    Great portions for the price and tastes great! <strong> -Jason Yim</strong>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column textAlign={'center'}>
              <Card>
                <Card.Content>
                  <Card.Header>Dunkin Donuts</Card.Header>
                  <Image size='medium'
                         src='https://s3-media1.fl.yelpcdn.com/bphoto/Weh8K8nkw1fCIDicleZltA/348s.jpg'/>
                  <Card.Description>
                    Best place for a quick donut and coffee <strong> -Ken Tung</strong>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column textAlign={'center'}>
              <Card>
                <Card.Content>
                  <Card.Header>Aja Sushi & Bento</Card.Header>
                  <Image style={{ width: '100%', height: '265px' }} size='medium'
                         src='https://s3-media1.fl.yelpcdn.com/bphoto/QLLIshiOpxYEBrJK5mlMCw/o.jpg'/>
                  <Card.Description>
                    Good stuff! <strong> -Philip Johnson</strong>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </div>

    );
  }
}

export default Landing;
