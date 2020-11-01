package test;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class respond extends HttpServlet{
    private static final long serialVersionUID = 3248678906731642558L;

    @Override
    public void doGet(final HttpServletRequest request, final HttpServletResponse response)
        throws ServletException, IOException{
        response.setContentType("text/html");
        final PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<body>");
        out.println("Hello");
        out.println("</body>");
        out.println("</html>");
        out.close();
    }
}