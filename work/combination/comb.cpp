#include <iostream>
#include <vector>
#include <string>

using namespace std;

int n = 0;

struct node {
    int k;
    int index;
    string word;
    node* next;
    node(int k, int index, string word) : k(k), index(index), word(word), next(NULL) {};
};

struct stack {
    node* head;
    stack() { head = NULL; }
    void push(node* x){
        x -> next = head;
        head = x;
    }
    void push(int k, int index, string word){
        push(new node(k, index, word));
    }
    node* pop(){
        if (head == NULL) return NULL;
        node* temp = head;
        head = head->next;
        return temp;
    }
};




struct queue {
    node* head;
    node* tail;
    queue* next;
    queue() { head = NULL; tail = NULL; }
    void push(node* x){
        if (head == NULL){
            head = x;
            tail = x;
        } else {
            tail -> next = x;
            tail = x;
        }
    }
    void push(int k, int index, string word){
        push(new node(k, index, word));
    }

    node* pop(){
        if (head == NULL) return NULL;
        node* temp = head;
        head = head->next;
        return temp;
    }
};

struct qStack {
    queue* head;
    qStack() { head = NULL; }
    void push(queue* x){
        x -> next = head;
        head = x;
    }
    queue* pop(){
        if (head == NULL) return NULL;
        queue* temp = head;
        head = head->next;
        return temp;
    }
};





queue* combine(vector<char> arr , int k , int index = 0 , string word = ""){
    if(k == 0){
        cout << word << " " << ++n << endl;
        return NULL;
    }
    queue* temp;
    for (int i = index; i < arr.size() - k + 1; i++)
        temp->push(k-1, i+1, word + arr[i]);
    return temp;
}

vector<char> arr = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};

int k = 1;

int main() {
    qStack parent;
    int index = 0;
    int k_loc = k;
    string word = "";
    while (true){
        queue* child = combine(arr, k_loc, index , word);
        if (child == NULL) child = parent.pop();
        else parent.push(child);
        node* cur = child->pop();
        index = cur->index;
        k_loc = cur->k;
        string word = cur->word;
        cout << word << index << k_loc << endl;
    }
    return 0;
}