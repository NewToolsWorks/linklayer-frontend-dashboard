

interface serviceLogs {
  Logs: []
}


const TableOne = (props: serviceLogs) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">


      <div className="flex flex-col">
        <div className="grid grid-cols-1 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-1">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Service information
            </h5>
          </div>

        </div>


        <div
          className={"grid grid-cols-1 sm:grid-cols-1 "}
        >

          {
            props.Logs.map((value, index) => {
              return (<>

                <div className="flex items-center gap-3 p-1 xl:p-1">
                  <p className="hidden text-black dark:text-white sm:block">
                    {value}
                  </p>

                </div>

              </>)
            })

          }



        </div>

      </div>
    </div>
  );
};

export default TableOne;
