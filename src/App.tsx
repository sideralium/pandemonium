import { createElement } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Test from './pages/Test';
import { cn } from './helper';
import { Routes } from './nav';

const App = () => {
  const nav: Routes = [
    { to: '/', name: 'home', exact: true, component: Home },
    { to: '/test', name: 'test', component: Test },
  ];

  return (
    <>
      <nav className={cn('nav')}>
        {nav.map((link, index) => {
          return (
            <>
              <NavLink className={cn('navlink')} exact={link.exact} to={link.to} key={index}>
                {link.name}
              </NavLink>

              {' '}
            </>
          );
        })}
      </nav>

      <div className={cn('content')}>
        <Switch>
          {nav.map((link, index) => {
            return (
              <Route key={index} path={link.to} exact={link.exact}>
                {createElement(link.component)}
              </Route>
            );
          })}

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
