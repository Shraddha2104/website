<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<!DOCTYPE html>
<html lang="">
<head>
<title>student login</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link href="../layout/styles/layout.css" rel="stylesheet" type="text/css" media="all">
</head>
    <body>

     <div class="p1"> RECORD</div>
         <p>
         <input type="button" value="HOME" id="btn" onClick="window.location='home.jsp'">
             <input type="button" value="RECORD" id="btn" onClick="window.location='record.jsp'">
              <input type="button" value="FORM" id="btn" onClick="window.location='form.jsp'">
               <input type="button" value="QUERY" id="btn" onClick="window.location='query.jsp'">
                <input type="button" value="CONTACT US" id="btn" onClick="window.location='contact us.jsp'">
         </p>
    <%
   Cookie cookie = null;
   Cookie[] cookies = null;
   // Get an array of Cookies associated with this domain
   cookies = request.getCookies();
   if( cookies != null ){
      out.println("<h2> Found Cookies Name and Value</h2>");
      for (int i = 0; i < cookies.length; i++){
         cookie = cookies[i];
         out.print("Name : " + cookie.getName( ) + ",  ");
         out.print("Value: " + cookie.getValue( )+" <br/>");
      }
  }else{
      out.println("<h2>No cookies found</h2>");
  }
%>
    
    
    
    
    <sql:setDataSource var="snapshot" driver="com.mysql.jdbc.Driver"
     url="jdbc:mysql://localhost/session"
     user="root"  password="root"/>
 
<sql:query dataSource="${snapshot}" var="result">
select * from user;
</sql:query>
 
<table border="1" width="100%">
re<tr>
   <th>username</th>
   <th> Name</th>
   <th>lname</th> 
    <th>home</th> 
    <th>records</th> 
    <th>queries</th> 
   <th>form</th> 
   <th>contactus</th> 
</tr>
<c:forEach var="row" items="${result.rows}">
<tr>
   <td><c:out value="${row.username}"/> </td>
   <td><c:out value="${row.name}"/></td>
   <td><c:out value="${row.lname}"/></td>
     <td><c:out value="${row.home}"/></td>
       <td><c:out value="${row.records}"/></td>
         <td><c:out value="${row.queries}"/></td>
           <td><c:out value="${row.form}"/></td>
             <td><c:out value="${row.contactus}"/></td>
 
</tr>
</c:forEach>
</table>
        
            
    </body>
</html>
