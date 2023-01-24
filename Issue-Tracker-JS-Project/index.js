// export class issuesTracker{
//     let issues = new Array();
    
//     constructor(title, priority, date, assignedTo, status){
//         let issue=new Object();
//         issue.title = title;
//         issue.priority = priority;
//         issue.date = date;
//         issue.assignedTo = assignedTo;
//         issue.status = "Open";

//         issues.push(issue);
//     }

// }

var issueList ={

    issues:[],

    displayClose:false,

    filterPriority: "",

    displayIssue:function(){
        this.displayClose=false;
        
        this.renderHtml();
    },

    displayClosedIssues:function(){
            this.displayClose=true;
            this.renderHtml();
     
   },

    renderHtml: function(){

        let divControl=document.getElementById("issueControl");
        divControl.innerHTML=null;

        for(let i =0;i<this.issues.length;i++)
            {
                let issueMetaData = this.issues[i];

                if((this.displayClose && issueMetaData.status !== "closed") || (!this.displayClose && issueMetaData.status == "closed")){
                    continue;
                }
                if(this.filterPriority && this.filterPriority!=issueMetaData.issuePriority){
                    continue;
                }
                let divContainer=document.createElement('div');
                divContainer.setAttribute('class', "issue");

                let ticketDiv=document.createElement('div');
                ticketDiv.innerHTML="Issue number: "+issueMetaData.issueNo;

                let titleDiv=document.createElement('div');
                titleDiv.innerHTML="Issue Description: "+issueMetaData.issueName;

                let priorityDiv=document.createElement('div');
                priorityDiv.innerHTML="Issue Priority: "+issueMetaData.issuePriority;

                let statusDiv=document.createElement('div');
                statusDiv.innerHTML="Issue Status: "+issueMetaData.status;

                let dateDiv=document.createElement('div');
                dateDiv.innerHTML="Date Created: "+issueMetaData.issueDate;

                let assignDiv=document.createElement('div');
                assignDiv.innerHTML="Assigned to: "+issueMetaData.issueAssignedTo;


                let holdButton=document.createElement('button');
                holdButton.id="Hold" + i;
                holdButton.innerHTML="Hold";
                holdButton.addEventListener('click',()=>{this.handleHoldButton(i)});
                

                let closeButton=document.createElement('button');
                closeButton.id="Close" + i;
                closeButton.innerHTML="Close";
                closeButton.addEventListener('click',()=>{this.handleCloseButton1(i)});
                

                let deleteButton=document.createElement('button');
                deleteButton.id="Delete" + i;
                deleteButton.innerHTML="Delete";
                deleteButton.addEventListener('click',()=> {this.handleDeleteButton1(i)});
                

                divContainer.appendChild(ticketDiv);
                divContainer.appendChild(titleDiv);
                divContainer.appendChild(priorityDiv);
                divContainer.appendChild(statusDiv);
                divContainer.appendChild(dateDiv);
                divContainer.appendChild(assignDiv);

                divContainer.appendChild(holdButton);
                divContainer.appendChild(closeButton);
                divContainer.appendChild(deleteButton);

                divControl.appendChild(divContainer);

            }

    },

    addIssue:function (){
  
        this.issues.push({
            issueNo: this.issues.length+1,
            issueName:document.getElementById("title").value,
            issuePriority:document.getElementById("priority").value,
            issueDate:document.getElementById("date").value,
            issueAssignedTo:document.getElementById("assignedTo").value,
            status:"open"

        });
        this.renderHtml();
    },
    
    filterByPriority:function (){

       if(this.issues.length ===0){
        console.log('There is nothing in the issue list')
        }
        else{
            this.filterPriority=document.getElementById("FilterPriority").value;
            debugger;
            //this.displayClose=true;
            if(this.filterPriority=="All"){
                this.filterPriority="";
            }
            this.renderHtml();
            
        }
    },

    handleHoldButton:function(index){
        let issueMetaData=this.issues[index];
        issueMetaData.status = "onhold";
        this.renderHtml();
    },

    handleCloseButton1(index){
        let issueMetaData=this.issues[index];
        issueMetaData.status = "closed";
        this.renderHtml();
    },

    handleDeleteButton1(index){
        let issueMetaData=this.issues[index];
        if(issueMetaData.status=="onhold"){
            alert("This cant be deleted!");
        }
        else{
            this.issues.splice(index, 1);
            this.renderHtml();
        }
        
    }

}


// document.getElementById('frm1').addEventListener('Submit',function(){
//         console.log(this);
//     });


