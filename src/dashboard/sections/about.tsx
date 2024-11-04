export default function About() {
    let apps = [{
        "img": "https://play-lh.googleusercontent.com/dKAVcxzsreIAOSld6qLRZGsfPHE6Pi6Wonbc6RjcNLKuNfyztpvwjsG_hsIqAZjIukDZ=w240-h480-rw",
        "url": "https://play.google.com/store/apps/details?id=com.newtoolsworks.linklayer&hl=en",
        "name": "LinkLayer VPN"
    },
    {
        "img": "https://play-lh.googleusercontent.com/EJcydUm9JT2yrUiPgGvvkkiQDcdVVI1bmh6upb-W9vhoAMT6EDPgc14aoBvWDYZJbk4=w240-h480-rw",
        "url": "https://play.google.com/store/apps/details?id=com.newtoolsworks.sockstunnel",
        "name": "SocksIP Tunnel"
    },
    {
        "img": "https://play-lh.googleusercontent.com/S_Lf-hrlBNd6iqr0UTiZwmm2QSnj8H8yOWBa0PPcHvAOUaMA4O-1VSUjlF0Kfpf5BfI=w240-h480-rw",
        "url": "https://play.google.com/store/apps/details?id=com.newtoolsworks.tun2tap",
        "name": "Tun2TAP"
    },
    {
        "img": "https://play-lh.googleusercontent.com/hKimybGG_wc7v9XT297DQCzKMUplgzn_kHwS_Gts4a_Gx2h3C8czisx9o8eFB2RCK2dS=w240-h480-rw",
        "url": "https://play.google.com/store/apps/details?id=com.newtoolsworks.vpn2share",
        "name": "VPN2Share"
    },
    {
        "img": "https://play-lh.googleusercontent.com/sGiyVG6V5CJARhTXl6HIGnszt1q7slBM_5T0bhVHEqia862b0tXwb4HQBZ8DNILjEcw=w240-h480-rw",
        "url": "https://play.google.com/store/apps/details?id=newtoolsworks.william.revssl&hl=en",
        "name": "RevSSL"
    }
    ]

    return (
        <div className="bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center p-4 text-center">
            <div className="max-h-full overflow-y-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="96"
                    height="96"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary mx-auto mb-8"
                >
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    <path d="M12 5.36 8.87 8.5a2.13 2.13 0 0 0 0 3h0a2.13 2.13 0 0 0 3 0l2.26-2.21a3 3 0 0 1 4.22 0l2.4 2.4"></path>
                    <path d="m18 15-2-2"></path>
                    <path d="m15 18-2-2"></path>
                </svg>
                <h1 className="text-4xl font-bold mb-6">¡Thank you so much!</h1>
                <p className="text-xl mb-8">
                    We greatly appreciate your support and trust in us. Thank you for using our projects.
                </p>
                <div className="bg-card text-card-foreground rounded-lg p-6 mb-8 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">linklayer web dashboard functions</h2>
                    <ul className="text-left list-disc list-inside space-y-2">
                        <li>You can manage your users.</li>
                        <li>You can manage the protocols supported by linklayer.</li>
                        <li>The web dashboard is open source, you can improve it</li>
                    </ul>
                </div>
                <p className="mb-8">
                    If you have any suggestions or want to add something, don't forget to make your PR in our repository.
                </p>
                <p className="mb-8">
                    Don't forget to visit our apps.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {
                        apps.map((item) => {
                            return (<>

                                { 
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <img className="h-[50px] w-[50px] mr-2" src={item.img}></img>
                                        <div className="flex flex-col items-start">
                                            <span className="text-xs font-light">{item.name}</span>
                                            <span className="text-xl font-semibold">Google Play</span>
                                        </div>
                                    </a>
                                    
                                }

                            </>)
                            
                        })

                    }



                </div>
            </div>
        </div>
    )
}