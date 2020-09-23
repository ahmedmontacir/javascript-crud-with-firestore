window.onload = function(e){ 
let list = document.querySelector('ul');
let form = document.querySelector('form');


list.addEventListener('click', e => {
   
   if(e.target.tagName === 'BUTTON'){
    let id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    db.collection("courses").doc(id).delete()
    .then( () => console.log("deleted"))
    .catch(err => console.log(err));

   }
})
form.addEventListener('submit', e => {
    e.preventDefault();
    let now = new Date();
    let courses_add = {
        courses: form.course.value,
        createrd_at: firebase.firestore.Timestamp.fromDate(now)
    }
  
    db.collection("courses").add(courses_add)
    .then(res =>  {
        form.reset();
        console.log(res);
    })
    .catch(err => console.log(err));

});

let addcourse = (course, id) => {
  let html = '<li class = "list-group-item" data-id = "'+id+'"><h3>'+course.courses+'</h3><small>'+course.createrd_at.toDate()+'</small><button class = "btn btn-xs btn-danger my-3"> delete </button></li>';
  list.innerHTML +=html;
}

let removecourse = id => {
    if(confirm("are you sure ?")){
    let courses = document.querySelectorAll('ul');
    courses.forEach( course => {
        if(course.getAttribute('data-id') === id){
            course.remove();
        }
    });
}
}
/*db.collection("courses").get()
.then(res => res.docs.forEach(course => {
    addcourse(course.data(),course.id);
}))
.catch(err => console.log(err));*/
db.collection("courses").onSnapshot(snap => {
    snap.docChanges().forEach(course => {
        if(course.type = "added"){
            addcourse(course.doc.data(),course.doc.id);
        }
       else{
           removecourse(course.doc.id);
       }
    })
})


}