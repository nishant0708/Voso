import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import TableOne from '../components/Tables/TableOne';
// import TableThree from '../components/Tables/TableThree';
// import TableTwo from '../components/Tables/TableTwo';
import UserTable from '../components/Tables/UserTable';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <UserTable />
        
      </div>
    </DefaultLayout>
  );
};

export default Tables;
