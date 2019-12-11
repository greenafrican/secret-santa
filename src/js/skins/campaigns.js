const campaigns = [
    {
        key: "buyfresh",
        background_color: "#3D3530",
        title: "Win with Kin & Buyfresh!",
        cutoff: {
            type: "number_of_people",
            goal: "4",
            status_text: "This group is {goal_difference} people away from a chance to WIN 1 of 10 Ultimate Fish Braai boxes from Buyfresh",
            success_text: "That's it! You've qualified to enter the competition to WIN 1 of 10 Ultimate Fish Braai boxes from Buyfresh"
        },
        external_link: "",
        terms_link: "",
        setup: {
            intro: [
                "Start something with your friends and you could WIN 1 of 10 Ultimate Fish Braai boxes from Buyfresh.",
                "Get 3 friends stoked to enjoy the ultimate fish braai and you’ll stand the chance to win your box!"
            ],
            form_title: "Set up your braai and invite friends",
            form_custom_fields: [
                {
                    key: "group",
                    title: "This braai group is called",
                    type: "text",
                    default: "Ultimate Fish Braai",
                }
            ],
        },
        optin: {
            intro: [
                "Hi!",
                "{creator_name} created '{group_name}' group and wants you to join in the fun...",
            ]
        },
        status: {
            intro: [
                "You've successfully joined {creator_name}'s '{group_name}' group!"
            ],
            invite: "You can still invite others to join you for your ultimate fish braai by sharing the link."
        },
        kin: {
            h1: "Experiences with friends are better without the awkward money stuff.",
            h2: "Start something with Kin. Buy the stuff. Get paid back.",
            list: [
                "Set-up groups for the things you do together",
                "Track the shared expenses",
                "Pay and get paid back"
            ]
        }
    }
];

export default campaigns;