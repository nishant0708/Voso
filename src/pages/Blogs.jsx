import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import BlogsTable from '../components/Tables/BlogsTable';

const Blogs = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blogs" />
      <div className="flex flex-col gap-10">
        <BlogsTable />
      </div>
    </DefaultLayout>
  );
};

export default Blogs;
