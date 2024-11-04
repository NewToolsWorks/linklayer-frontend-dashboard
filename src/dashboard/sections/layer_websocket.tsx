
const Layer_Websocket = () => {

    return (<>
        <div className="w-full">

            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col w-3/5 p-4 shadow-2 bg-white  md:w-3/5 w-4/5" >
                <h4 className="mb-1 mt-2 font-bold font-sans  text-black dark:text-white">
                        Websocket
                    </h4>
                    <p className="text-xs text-gray-200 mb-2">
                    Websocket does not require any configuration, since it is activated in the HTTP layer by default, but what you do have to do is configure your CDN to be able to forward traffic to the HTTP port and thus be able to establish a websocket connection easily and quickly.
                    </p>
                </div>
            </div>
        </div>
    </>)
}

export default Layer_Websocket