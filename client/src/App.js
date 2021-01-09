/** Este es mi root component de toda la aplicacion*/
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import Customers from './components/customers';
import HomeAdmin from "./components/vistas/homeAdmin";
import Login from "./components/vistas/login";
import Register from "./components/vistas/register";
import UserProfile from "./components/vistas/profileUser";
import TableProd from "./components/vistas/tableProd";
import Error from "./components/Error";
import StoreInfo from "./components/vistas/storeInfo";
import clientEcommInvoice from "./components/vistas/clientEcom";
import RegisterStore from "./components/vistas/registerStore";
import ProductShop from "./components/vistas/productShop";
import TableOfert from "./components/vistas/tableOfert";
import Charts from "./components/Charts";
import Pedido from "./components/vistas/deliveryInCurse";
import PedidoInfo from "./components/vistas/deliveryInCurseInfo";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} />
          <Route path="/homeAdmin" component={HomeAdmin} />
          <Route path="/registerStore" component={RegisterStore} />
          <Route path="/storeInfo" component={StoreInfo} />
          <Route path="/userProfile" component={UserProfile} />
          <Route path="/tableProd" component={TableProd} />
          <Route path="/tableOfert" component={TableOfert} />
          <Route path="/productShop" component={ProductShop} />
          <Route path="/clientInfoInvoice" component={clientEcommInvoice} />
          <Route path="/deliveryInCurse" exact component={Pedido} />
          <Route path="/deliveryInCurse/:idP" component={PedidoInfo} />
          <Route path="/deliveryInCurseInfo" component={PedidoInfo} />
          <Route path="/charts" component={Charts} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

// <Route path="/deliveryInCurse/:idP" component={PedidoInfo} />

export default App;

/** Token gitHub
 * vscode://vscode.github-authentication/did-authenticate?windowid=1&code=d493d2c738af19419407&state=7c685593-59c0-4135-bdd9-a9c006442cc7
 */
