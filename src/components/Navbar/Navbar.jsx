import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from 'react-router-dom'
import Divider from '@material-ui/core/Divider';
import styles from '../../assets/components/Header/jss/header-style';
import logo from '../../assets/components/Header/img/logo.png'
import { closeAppbar } from '../../actions/close_appbar'

class Navbar extends Component {

    isSelectedRoute = (path) => {
        return window.location.pathname === path;
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.props;
        return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={this.props.closeNavbar}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <img src={logo} alt="" className={classes.image}/>
            <Divider/>
            <List>
                {this.props.routes.map((prop, index) => {
                    const isCurrPath = this.isSelectedRoute(prop.path)
                    return <NavLink to={prop.path} className={classes.links} activeClassName={classes.selected}
                                    key={prop.name}>
                        <ListItem button key={prop.name} className={classNames({
                            [classes.listItem]: true,
                            [classes.selected]: isCurrPath
                        })}>
                            <ListItemText
                                primaryTypographyProps={{
                                    className: isCurrPath ? classes.listItemTextSelected : classes.listItemText
                                }}
                            >
                                {prop.name}
                            </ListItemText>
                        </ListItem>
                    </NavLink>
                })}
            </List>
        </Drawer>);

    }

}

function mapStateToProps(state) {

    return {
        open: state.appbar
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({closeNavbar : closeAppbar}, dispatch)
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(Navbar));