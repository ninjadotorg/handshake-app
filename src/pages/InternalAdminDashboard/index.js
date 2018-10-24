import React, { Component } from 'react';
import DynamicImport from '@/components/App/DynamicImport';
import Loading from '@/components/core/presentation/Loading';
import InternalAdmin from '@/pages/InternalAdmin/InternalAdmin';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles.scss';

const AdminIDVerification = props => (<DynamicImport loading={Loading} load={() => import('@/pages/Admin/AdminIDVerification')}>{ ComponentLoaded => <ComponentLoaded {...props} />}</DynamicImport>);
// const InternalAdmin = props => (<DynamicImport loading={Loading} load={() => import('@/pages/InternalAdmin/InternalAdmin')}>{ ComponentLoaded => <ComponentLoaded {...props} />}</DynamicImport>);

const scopeCss = (className) => `internal-admin-${className}`;

const menus = {
  idVerification: {
    name: 'Admin',
    components: <AdminIDVerification />,
  },
  buyCoinBank: {
    name: 'Buy Coin - BANK',
    components: <InternalAdmin type="bank" />,
  },
  buyCoinCod: {
    name: 'Buy Coin - COD',
    components: <InternalAdmin type="cod" />,
  },
};

class InternalAdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      selectedMenuId: 'idVerification',
    };
  }

  onMenuSelect = (idMenu) => {
    this.setState({ selectedMenuId: idMenu });
  }

  renderBody = () => {
    const { selectedMenuId } = this.state;
    const menuData = menus[selectedMenuId];
    if (!menuData) return null;
    return menuData?.components || null;
  }

  render() {
    return (
      <main>
        <Header title={menus[this.state.selectedMenuId]?.name} />
        <Sidebar menus={menus} selectedMenuId={this.state.selectedMenuId} onMenuSelect={this.onMenuSelect} />
        <div className={scopeCss('container')}>
          {this.renderBody()}
        </div>
      </main>
    );
  }
}

export default InternalAdminDashboard;