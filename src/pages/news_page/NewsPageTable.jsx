import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

const NewsPageTable = () => {
  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="font-extrabold text-center">
            <tr className="font-extrabold whitespace-nowrap rounded-sm bg-gray-2 dark:bg-meta-4">
              <th className="p-2.5 lg:p-4 sm:!pl-14 pl-3">Image</th>
              <th className="p-3.5 lg:p-4 !pl-13">Title</th>
              <th className="p-3.5 lg:p-4 !pl-13">Category</th>
            </tr>
          </thead>
          <tbody className="text-black dark:text-white text-center whitespace-nowrap">
            <tr>
              <td className="p-2.5 lg:p-4 sm:!pl-14 pl-3 font-extrabold"></td>
              <td className="p-2.5 lg:p-4 !pl-13 capitalize"></td>
              <td className="p-2.5 lg:p-4 !pl-13"></td>
              <td className="p-2.5 lg:p-4 !pl-12 text-meta-5"></td>
              <td className="relative p-2.5 lg:p-4 !pl-5 flex justify-center items-center"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default NewsPageTable;
