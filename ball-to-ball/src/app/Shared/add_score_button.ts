 export const common= [
        {
            "name":0,
            "value":0
        },
        {
            "name":1,
            "value":1
        },
        {
            "name":2,
            "value":2
        },
        {
            "name":3,
            "value":3
        },
        {
            "name":4,
            "value":4
        },
        {
            "name":5,
            "value":5
        },
        {
            "name":6,
            "value":6
        },
        {
            "name":7,
            "value":7
        },
        // {
        //     "name":"wide",
        //     "value":0,
        //     'logic':true
        // },
        // {
        //     "name":"noball",
        //     "value":0
        // },
        // {
        //     "name":"byes",
        //     "value":0
        // },
    ]

export const shots =[
    {
        "name":'Pull Shot'
    },
    {
        "name":'Square Cut'
    },
    {
        "name":'Cover Drive'
    },
    {
        "name": 'Straight Drive'
    },
    {
        "name":'Pull Shot'
    },

    {
        "name":'Flick'
    },
    {
        "name":'Sweep'
    },
    {
        "name":'Reverse Sweep'
    },
    {
        "name":'Defensive Shot'
    }
]

export const Out =[
  {
      "name":'Catch Out',
      'value':'caught'
  },
  {
    "name":'Stump Out',
    'value':'stumped'
},
{
  "name":'Hit Wicket',
  'value':'hitwicket'
},
{
  "name":'Bowled',
  'value':'bowled'
},
{
  "name":'L.B.W.',
  'value':'lbw'
}
]

export const valid_ball=[
    {
        "id":0,
        "name":"wide",
        "value":'wide',
        'isselected':'',
        'isBye':false

    },
    {
        "id":1,
        "name":"noball",
        "value":'noball',
        'isselected':'',
        'isBye':false

    },
    {
        "id":2,
        "name":"byes",
        "value":'byes',
        'isselected':'',
        'isBye':false
    },
]



 const exp_batsman = {
    matchId:'',
    newBatsmanId1:'',
    newBatsmanId2:''
  };
  function batsDetails(matchId:any, striker:any,nonStriker:any){
    exp_batsman.matchId=matchId
    exp_batsman.newBatsmanId1 = striker
    exp_batsman.newBatsmanId2=nonStriker

  }
  export {exp_batsman,batsDetails}
const bowler = {
    matchId:'',
    newBowlerId:''
}

    function bowlerDetails(matchId:any, bowlerId:any){
        bowler.matchId=matchId
        bowler.newBowlerId=bowlerId
    }
    export {bowler,bowlerDetails};
interface UpdateScoreInterface{
  matchId:string;
  runs:number;
  byes:boolean;
  validity:string;
  wicketType:string|undefined;
  wicketPlayerId:string|undefined;
}

const UpdateScore:UpdateScoreInterface={
    matchId:'',
    runs:0,
    byes:false,
    validity:'valid',
    wicketType:undefined,
    wicketPlayerId:undefined
}

function ScoreDetails(matchId:any,runs:any,byes:any,validity:any,wicketType:any,wicketPlayerId:any){
    UpdateScore.matchId=matchId
    UpdateScore.runs=runs
    UpdateScore.byes=byes
    UpdateScore.validity=validity
    UpdateScore.wicketType=wicketType
    UpdateScore.wicketPlayerId=wicketPlayerId
}
export {UpdateScore,ScoreDetails}

const UndoUpdateScore= {
    matchId:'',
    runs:'',
    byes:'',
    validity:'',
    wicketType:'',
    wicketPlayerId:''
}

function UndoUpdateDetails(matchId:any,runs:any,byes:any,validity:any,wicketType:any,wicketPlayerId:any){
    UndoUpdateScore.matchId=matchId
    UndoUpdateScore.runs=runs
    UndoUpdateScore.byes=byes
    UndoUpdateScore.validity=validity
    UndoUpdateScore.wicketType=wicketType
    UndoUpdateScore.wicketPlayerId=wicketPlayerId
}
export {UndoUpdateScore,UndoUpdateDetails}

export let page_No:number;

export function set_page(page:number){
    page_No=page;

}
export let limit:number;
export function set_limit(page_limit:number){
    limit=page_limit

}
export let alert_route:string;
export function set_alert_route(route:string){
    alert_route=route;
}

export const graphs= [
    {
        'name':"Bar Graph",
        'value':"bar"
    },
    {
        'name':"Pie Graph",
        'value':"pie"
    },
    {
        'name':"Line Graph",
        'value':"line"
    },
    {
        'name':"Radar Graph",
        'value':"radar"
    }
]
export let graph_type:any;
export function set_graph_type(value:any){
    graph_type=value;
}