package com.bill.billingapp.utilities;

public class CommonResponse <T>{
	
	private T response;
	private int statusCode;
	
	
	
	public CommonResponse(T response, int statusCode) {
		this.response = response;
		this.statusCode = statusCode;
	}
	public T getResponse() {
		return response;
	}
	public void setResponse(T response) {
		this.response = response;
	}
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	@Override
	public String toString() {
		return "CommonResponse [response=" + response + ", statusCode=" + statusCode + "]";
	}
	
	public CommonResponse() {
		// TODO Auto-generated constructor stub
	}
	

}
