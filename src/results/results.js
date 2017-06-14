import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';

const ResultsPage = ({ users }) => {
  console.log(users);
  return (
    <Container>
      <Row className="flex-colum" style={{ padding: '16px 0 32px 0' }}>
        <Col xs={12} className="d-flex justify-content-center">
          <Subheader style={{ textAlign: 'center', paddingLeft: 0 }}>
            Gewinner:
          </Subheader>
        </Col>
        <Col xs={12} className="d-flex justify-content-center">
          <Avatar src={users[0].image} size={120} />
        </Col>
        <Col
          xs={12}
          className="d-flex justify-content-center"
          style={{ marginTop: 16 + 'px' }}
        >
          <h3>{users[0].nickname}</h3>
        </Col>
        <Col xs={12} className="d-flex justify-content-center">
          <Chip>
            {getUserPoints(users[0])} Pts.
          </Chip>
        </Col>
      </Row>
      <Row>
        <List
          style={{
            width: 100 + '%'
          }}
        >
          <Divider />
          {users.filter((u, i) => i !== 0).map((user, i) => (
            <span key={user.id}>
              <ListItem
                primaryText={
                  <span
                    style={{
                      width: 100 + '%',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Avatar src={user.image} />
                    <span
                      style={{
                        marginLeft: 16 + 'px'
                      }}
                    >
                      <strong>{user.nickname}</strong>
                    </span>
                    <Chip
                      style={{
                        marginLeft: 'auto'
                      }}
                    >
                      {getUserPoints(user)} Pts.
                    </Chip>
                  </span>
                }
                // secondaryText={user.name}
              />
              <Divider />
            </span>
          ))}
        </List>
      </Row>
    </Container>
  );
};

ResultsPage.propTypes = {
  users: PropTypes.array.isRequired
};

const getUserPoints = user =>
  user.completed.map(task => task.points).reduce((acc, val) => acc + val, 0);

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    users: [...state.users.all].sort((userA, userB) => {
      const userAScores = getUserPoints(userA);
      const userBScores = getUserPoints(userB);
      return userAScores < userBScores;
    })
  };
};

const Results = connect(mapStateToProps, mapDispatchToProps)(ResultsPage);

export default Results;
