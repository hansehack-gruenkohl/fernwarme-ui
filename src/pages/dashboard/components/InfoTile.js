import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class InfoTile extends React.Component {

  render(){
    return <Card style={{ flex: '0 15%', height: '100%'}}>
          <CardContent>
            <Typography>{ this.props.headline }</Typography>
            <Typography variant="headline" component="h2">{ this.props.value } { this.props.unit} </Typography>
          </CardContent>
        </Card>
  }
}


