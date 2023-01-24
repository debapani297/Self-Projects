package practice;

import java.util.HashMap;

public class practice {

	public static void main(String[] args) {
//		int[] A= {5, 10, 20, 100, 105};
//		int B=110;
		
//		int[] A= {1, 2, 3, 4, 5};
//		int B=5;
		
//		int[] A= {15, 2, 5, 6, 9};
//		int B=7;
//		
//		int[] ans= solve(A, B);
//		
//		for (int i = 0; i < ans.length; i++) {
//			System.out.print(ans[i]+" ");
//		}
		//=================================================
		
//		int[] A= {2, 7, 11, 15};
//		int B=9;
		
		int[] A= {4, 7, -4, 2, 2, 2, 3, -5, -3, 9, -4, 9, -7, 
				7, -1, 9, 9, 4, 1, -4, -2, 3, -3, -5, 4, -7, 7, 9, -4, 4, -8};
		int B=-3;
		
		int[] ans= twoSum(A, B);
		
		for (int i = 0; i < ans.length; i++) {
			System.out.print(ans[i]+" ");
		}
		
		
	}
	
	public static int[] twoSum(final int[] A, int B) {
        int n=A.length,size=n, start=Integer.MAX_VALUE, end= Integer.MIN_VALUE;
        HashMap<Integer, Integer> map= new HashMap<Integer, Integer>();

        for(int i=n-1; i>=0; i--){
            if(A[i]==B){
                if(i<start){
                    start=i; end=i; size=1;
                }
            }
            else if(map.containsKey(B-A[i])){
                if( (map.get(B-A[i])-i+1) <=size){
                    start=i; end= map.get(B-A[i]); size=(map.get(B-A[i])-i+1);
                }
                
            }

            
                map.put(A[i], i);

        }

        if(start!=Integer.MAX_VALUE && end!=Integer.MIN_VALUE)
        {
            int[] ans={start+1, end+1};
            return ans;
        }
        else{
            int[] ans={};
            return ans;
        }
    }
	
	
	
	public static int[] solve(int[] A, int B) {
        int start=0, end=0, flag=0, n=A.length, sum=0;
        
        for(int i=0; i<n; i++){
        	 flag=0;
            sum+=A[i];
            if(A[i]==B){
                start=i;end=i; flag=1; break;
            }
            else if(sum == B){
                end=i; flag=1; break;
            }
            else if(sum>B){
                if(A[i]<B){
                    for(int j=start; j<i; j++){
                        sum-=A[start];
                        start++;

                        if(sum==B){
                            end=i; flag=1; break;
                        }
                        else if(sum<B){
                            break;
                        }
                    }
                    if(flag==1) break;
                }
                else{
                    start=i+1;
                    sum=0;
                }
            }
           
        }
        if(flag==1){
            int[] ans= new int[end-start+1];
            for(int i=start; i<=end; i++){
                ans[i-start]=A[i];
            }
            return ans;
        }
        else{
            int[] ans={-1};
            return ans;
        }
    }
}
