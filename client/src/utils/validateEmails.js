
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line import/no-anonymous-default-export
export default (emailList) => {
  const invalidEmails = emailList
  .split(",")
  .map(email => email.trim())
  .filter(email => re.test(email) === false);

  if(invalidEmails.length){
    return `These emails are invalid: ${invalidEmails}`;
  }

  return null;
}