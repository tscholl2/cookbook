package server

import (
	"compress/gzip"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/pkg/errors"
)

func writeJSON(w http.ResponseWriter, v interface{}) error {
	w.Header().Set("content-type", "application/json;charset=utf-8")
	w.Header().Set("content-encoding", "gzip")
	W, err := gzip.NewWriterLevel(w, 1)
	if err != nil {
		return err
	}
	defer W.Close()
	encoder := json.NewEncoder(W)
	encoder.SetIndent("", "  ")
	return errors.Wrap(encoder.Encode(v), "json")
}

func readJSON(r *http.Request, v interface{}) error {
	return errors.Wrap(json.NewDecoder(r.Body).Decode(v), "json")
}

type HttpErrHandler func(http.ResponseWriter, *http.Request) error

func errorHandler(h HttpErrHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := h(w, r); err != nil {
			var code int
			if H, ok := err.(httpError); ok {
				if H.err == nil {
					return
				}
				code, err = H.code, H.err
			} else {
				code = http.StatusInternalServerError
			}
			loggingMap := getLoggingMap(r)
			loggingMap["error"] = err
			ID, _ := r.Context().Value(reqIDCtxKey).(string)
			http.Error(w, fmt.Sprintf("req %s: %s", ID, err), code)
		}
	}
}

type httpError struct {
	err  error
	code int
}

func (err httpError) Error() string {
	return fmt.Sprintf("HTTP %d: %s", err.code, err.err.Error())
}

func codeErr(code int) httpError {
	return httpError{errors.New(http.StatusText(code)), code}
}

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func newUUID() string {
	var buf [22]byte
	for i := range buf {
		buf[i] = alphabet[rand.Intn(len(alphabet))]
	}
	return string(buf[:])
}
